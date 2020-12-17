/*
DECLARE @user_id NVARCHAR(128) = 'b1410b5c-ad83-4047-beb8-7aba16eb400c',
  		@variant NVARCHAR(10) = 'short',
		@vision NVARCHAR(10) = 'short',
		@dateFrom DATETIME = '2020-11-01T00:00:00',
		@dateTo DATETIME = GETDATE(),
		@orgId NVARCHAR(MAX) = '28,5502,5503',
		@accessId INT = 1;
*/

DECLARE @orgList TABLE (Id INT);
INSERT INTO @orgList
SELECT 
	value
FROM STRING_SPLIT(REPLACE(@orgId,' ', SPACE(0)),',');

IF OBJECT_ID('tempdb..##temp_status') IS NOT NULL 
BEGIN
	DROP TABLE ##temp_status;
END

CREATE TABLE ##temp_status(
  sort INT,
  status_name NVARCHAR(100),
) WITH (DATA_COMPRESSION = PAGE);

INSERT INTO ##temp_status (status_name, sort)
SELECT N'перехідні', 1
UNION
SELECT N'надійшло', 2
UNION
SELECT N'виконано', 3 
UNION
SELECT N'залишилось', 4;

IF OBJECT_ID ('tempdb..#Types_Tree') IS NOT NULL
BEGIN
	DROP TABLE #Types_Tree;
END

;
WITH ClaimTypes_Tree (Id, parentId, RootId, [Caption], DataFiled, HasChild, [level], TypeAccessID)
AS
( 
    SELECT [Id], 
		   [Parent_сlaim_types_ID], 
		   NULL,
		   [Name],
		   'type_' + CAST(e.Id AS NVARCHAR(10)),
		   IIF(EXISTS(SELECT Id FROM dbo.[Claim_types] WHERE [Parent_сlaim_types_ID] = e.Id), 1, 0),
		   0,
		   TypeAccess_ID
    FROM dbo.[Claim_types] e
    WHERE e.Id = 1 
    UNION ALL
	SELECT
		   e.[Id], 
		   e.[Parent_сlaim_types_ID], 
		   NULL,
		   e.[Name], 
		   'type_' + CAST(e.Id AS NVARCHAR(10)),
		   IIF(EXISTS(SELECT Id FROM dbo.[Claim_types] WHERE [Parent_сlaim_types_ID] = e.Id), 1, 0),
		   r.level + 1,
		   e.TypeAccess_ID
    FROM dbo.[Claim_types] e
    INNER JOIN ClaimTypes_Tree r ON e.Parent_сlaim_types_ID = r.Id
	WHERE e.TypeAccess_ID = @accessId
	AND ISNULL(e.Is_delete,0) = 0
)
SELECT 
	Id, 
	parentId, 
	RootId,
	[Caption], 
	DataFiled, 
	HasChild, 
	[level],
	TypeAccessID
INTO #Types_Tree
FROM ClaimTypes_Tree
WHERE [level] <> 0;

UPDATE t
	SET HasChild = IIF(sub2.sumHasChild > 0, 1, 0)
FROM #Types_Tree t
INNER JOIN (
	SELECT	
		sub.Id,
		SUM(hasChild) sumHasChild
	FROM (	
		SELECT 
			t1.Id,
			IIF(t2.Id IS NULL, 0, 1) AS hasChild 
		FROM #Types_Tree t1
		LEFT JOIN #Types_Tree t2 ON t1.Id = t2.parentId
	) sub
	GROUP BY sub.Id
) AS sub2 ON sub2.Id = t.Id;

--select * from #Types_Tree

DECLARE @RootTypes TABLE (Id INT, rootId INT);
DECLARE @StepTypes TABLE (Id INT, parentId INT);

DECLARE @Data_Row_TypeID INT
DECLARE my_cur CURSOR FOR 

    SELECT 
		Id 
	FROM #Types_Tree;

OPEN my_cur
FETCH NEXT FROM my_cur INTO @Data_Row_TypeID
WHILE @@FETCH_STATUS = 0
BEGIN
  ------------------------------------------------------------------------------------------------------------
  WITH EndTypes_tree (Id, parentId)
		AS
		(
		SELECT 
			Id, 
			Parent_сlaim_types_ID
		FROM dbo.Claim_types e
		WHERE e.Id = @Data_Row_TypeID 
		UNION ALL
		SELECT 
			e.Id, 
			e.Parent_сlaim_types_ID
		FROM dbo.Claim_types e
		    INNER JOIN EndTypes_tree r ON e.Id = r.parentId
		)

		INSERT INTO @StepTypes
		SELECT 
			Id,
			parentId
		FROM EndTypes_tree;

		--SELECT * FROM @StepTypes

		UPDATE #Types_Tree 
			SET RootId = (SELECT Id FROM @StepTypes WHERE parentId = 1)
		WHERE Id = @Data_Row_TypeID;

		DELETE FROM @StepTypes;

  ------------------------------------------------------------------------------------------------------------


FETCH NEXT FROM my_cur INTO @Data_Row_TypeID
END
CLOSE my_cur
DEALLOCATE my_cur

--SELECT * FROM #Types_Tree ORDER BY [level], parentId;

IF object_id('tempdb..##Claims_fullData') IS NOT NULL 
BEGIN
	DROP TABLE ##Claims_fullData;
END

CREATE TABLE ##Claims_fullData(
  Id INT IDENTITY(1,1),
  TypeId INT,
  parentId INT,
  TypeCode NVARCHAR(MAX),
  parentTypeCode NVARCHAR(MAX),
  RootId INT,
  OrgId INT,
  StatusId INT,
  val INT
) WITH (DATA_COMPRESSION = PAGE);

IF object_id('tempdb..##Claims_treeParent') IS NOT NULL 
BEGIN
	DROP TABLE ##Claims_treeParent;
END

CREATE TABLE ##Claims_treeParent(
  Id INT IDENTITY(1,1),
  TypeId INT,
  parentId INT,
  RootId INT
) WITH (DATA_COMPRESSION = PAGE);

IF object_id('tempdb..##Claims_treeOtherData') IS NOT NULL 
BEGIN
	DROP TABLE ##Claims_treeOtherData;
END

CREATE TABLE ##Claims_treeOtherData(
  Id INT IDENTITY(1,1),
  TypeId INT,
  parentId INT,
  RootId INT,
  HasChild BIT
) WITH (DATA_COMPRESSION = PAGE);

IF(@variant = 'short')
BEGIN
	INSERT INTO ##Claims_treeOtherData (TypeId, parentId, RootId, HasChild)
	SELECT 
		Id,
		parentId,
		RootId,
		HasChild
	FROM #Types_Tree
	WHERE [level] = 1;
END
ELSE
BEGIN
	INSERT INTO ##Claims_treeOtherData (TypeId, parentId, RootId)
	SELECT 
		Id,
		parentId,
		RootId
	FROM #Types_Tree
	WHERE HasChild = 1;
END

	INSERT INTO ##Claims_treeParent (TypeId, parentId, RootId)
	SELECT 
		Id,
		parentId,
		RootId
	FROM #Types_Tree;

-- перехідні
INSERT INTO ##Claims_fullData (TypeId, OrgId, StatusId, val)
SELECT
	c.Claim_type_ID,
	Response_organization_ID,
	1 AS statusId,
	COUNT(1) AS val
FROM dbo.Claims c 
INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
AND org.Id IN (SELECT Id FROM @orgList)
WHERE Claim_type_ID IN (SELECT TypeId FROM ##Claims_treeOtherData)
AND Created_at < @dateFrom 
AND (Fact_finish_at >= @dateFrom 
	OR Fact_finish_at is null)
GROUP BY Claim_type_ID,
		 Response_organization_ID,
		 Short_name;

-- надійшло
INSERT INTO ##Claims_fullData (TypeId, OrgId, StatusId, val)
SELECT
	c.Claim_type_ID,
	Response_organization_ID,
	2 AS statusId,
	COUNT(1) AS val
FROM dbo.Claims c 
INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
AND org.Id IN (SELECT Id FROM @orgList)
WHERE Created_at <= @dateTo
AND Claim_type_ID IN (SELECT TypeId FROM ##Claims_treeOtherData)
AND Created_at BETWEEN @dateFrom AND @dateTo
GROUP BY Claim_type_ID,
		 Response_organization_ID,
		 Short_name;

-- виконано
INSERT INTO ##Claims_fullData (TypeId, OrgId, StatusId, val)
SELECT
	c.Claim_type_ID,
	Response_organization_ID,
	3 AS statusId,
	COUNT(1) AS val
FROM dbo.Claims c 
INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
AND org.Id IN (SELECT Id FROM @orgList)
WHERE Created_at <= @dateTo
AND Claim_type_ID IN (SELECT TypeId FROM ##Claims_treeOtherData)
AND Fact_finish_at IS NOT NULL 
AND Fact_finish_at BETWEEN @dateFrom AND @dateTo
GROUP BY Claim_type_ID,
		 Response_organization_ID,
		 Short_name;

-- залишилось
INSERT INTO ##Claims_fullData (TypeId, OrgId, StatusId, val)
SELECT
	c.Claim_type_ID,
	Response_organization_ID,
	4 AS statusId,
	COUNT(1) AS val
FROM dbo.Claims c 
INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
AND org.Id IN (SELECT Id FROM @orgList)
WHERE Created_at <= @dateTo
AND Claim_type_ID IN (SELECT TypeId FROM ##Claims_treeOtherData)
AND (Fact_finish_at IS NULL OR Fact_finish_at > @dateTo)
GROUP BY Claim_type_ID,
 Response_organization_ID,
 Short_name;

 UPDATE d
	SET RootId = t.RootId,
		parentTypeCode = N'type_' + RTRIM(t.RootId) + N'_parent',
		TypeCode = N'type_' + RTRIM(d.typeId)
 FROM ##Claims_fullData d
 INNER JOIN ##Claims_treeParent t ON t.TypeId = d.TypeId;

 --SELECT * FROM ##Claims_fullData;

IF (@variant = 'short')
BEGIN
DELETE FROM #Types_Tree
WHERE [level] > 2;

UPDATE #Types_Tree 
SET [HasCHild] = IIF([level] = 2, 0, 1);
END

IF object_id('tempdb..##temp_OUT_Claims') IS NOT NULL 
BEGIN
	DROP TABLE ##temp_OUT_Claims;
END

CREATE TABLE ##temp_OUT_Claims(
  Id INT IDENTITY(1,1),
  TypeId INT,
  parentTypeCode NVARCHAR(MAX),
  TypeCode NVARCHAR(MAX),
  OrgId INT,
  short_name NVARCHAR(100),
  StatusId INT,
  val INT
) WITH (DATA_COMPRESSION = PAGE);


DECLARE @End_types TABLE (Id INT, parentId INT, processed BIT);
INSERT INTO @End_types (Id, parentId, processed)
SELECT 
DISTINCT 
	Id,
	parentId,
	0
FROM #Types_Tree WHERE HasChild = 0;

DECLARE @current_id INT;
WHILE (SELECT COUNT(1) FROM @End_types WHERE processed <> 1) > 0
BEGIN
	SELECT TOP 1 
		@current_id = Id 
	FROM @End_types 
	WHERE processed <> 1;

	WITH ClaimType_Vals (Id, parentId)
		AS
		(
		    SELECT [Id], 
				   [Parent_сlaim_types_ID]
		    FROM dbo.Claim_types e
		    WHERE e.Id = @current_id
		    UNION ALL
			SELECT e.[Id], 
				   e.[Parent_сlaim_types_ID]
		    FROM dbo.Claim_types e
			INNER JOIN ClaimType_Vals r ON e.Parent_сlaim_types_ID = r.Id
			)

		INSERT INTO @StepTypes (Id, parentId)
		SELECT  
			Id,
			parentId
		FROM ClaimType_Vals
		WHERE Id NOT IN (SELECT Id FROM @StepTypes);

		-- перехідні
		INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
		SELECT
		DISTINCT
			@current_id,
			N'type_' + RTRIM(@current_id) claim_type_code, 
			Response_organization_ID,
			org.short_name, 
			1 AS statusId,
			COUNT(1) AS val
		FROM dbo.Claims c 
		INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
		AND org.Id IN (SELECT Id FROM @orgList)
		WHERE Claim_type_ID IN (SELECT Id FROM @StepTypes)
		AND Created_at < @dateFrom 
		AND (Fact_finish_at >= @dateFrom 
			OR Fact_finish_at IS NULL)
		GROUP BY Response_organization_ID,
				 Short_name;
		
		-- надійшло
		INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
		SELECT
			@current_id,
			N'type_' + RTRIM(@current_id) claim_type_code, 
			Response_organization_ID,
			org.short_name, 
			2 AS StatusId,
			COUNT(1) AS val
		FROM dbo.Claims c 
		INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
		AND org.Id IN (SELECT Id FROM @orgList)
		WHERE Created_at <= @dateTo
		AND Claim_type_ID IN (SELECT Id FROM @StepTypes)
		AND Created_at BETWEEN @dateFrom AND @dateTo
		GROUP BY Response_organization_ID,
				 Short_name;
		
		-- виконано
		INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
		SELECT
			@current_id,
			N'type_' + RTRIM(@current_id) claim_type_code, 
			Response_organization_ID,
			org.short_name, 
			3 AS StatusId,
			COUNT(1) AS val 
		FROM dbo.Claims c 
		INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
		AND org.Id IN (SELECT Id FROM @orgList)
		WHERE Created_at <= @dateTo
		AND Claim_type_ID IN (SELECT Id FROM @StepTypes)
		AND Fact_finish_at IS NOT NULL 
		AND Fact_finish_at BETWEEN @dateFrom AND @dateTo
		GROUP BY Response_organization_ID,
				 Short_name;
		
		-- залишилось
		INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
		SELECT
			@current_id,
			N'type_' + RTRIM(@current_id) claim_type_code, 
			Response_organization_ID,
			org.short_name, 
			4 AS StatusId,
			COUNT(1) AS val 
		FROM dbo.Claims c 
		INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
		AND org.Id IN (SELECT Id FROM @orgList)
		WHERE Created_at <= @dateTo
		AND Claim_type_ID IN (SELECT Id FROM @StepTypes)
		AND (Fact_finish_at IS NULL OR Fact_finish_at > @dateTo)
		GROUP BY Response_organization_ID,
				 Short_name;

		UPDATE @End_types 
			SET processed = 1
		WHERE Id = @current_id;

		DELETE FROM @StepTypes;
END

IF (@vision <> 'full') 
		OR @vision IS NULL
BEGIN
	DECLARE @ForDelete TABLE (typeId INT, val INT);
	INSERT INTO @ForDelete 
	SELECT 
		typeId,
		SUM(ISNULL(val,0))
	FROM ##temp_OUT_Claims
	GROUP BY typeId;
	
	DELETE FROM ##temp_OUT_Claims
	WHERE typeId IN (SELECT 
						typeId
					 FROM @ForDelete
					 WHERE ISNULL(val,0) = 0);
END
ELSE 
BEGIN
	INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
	SELECT 
		t.Id,
		N'type_' + RTRIM(t.Id),
		org.Id,
		org.Short_name,
		1,
		0
	FROM #Types_Tree t
	LEFT JOIN dbo.Organizations org ON org.Id IN (SELECT Id FROM @orgList) 
	WHERE HasChild = 0
	AND t.Id NOT IN (SELECT 
						TypeId 
				   FROM ##temp_OUT_Claims);
END


UPDATE c
	SET c.parentTypeCode = N'type_' + RTRIM(rt.rootId) + N'_itog'
FROM ##temp_OUT_Claims c
INNER JOIN ##Claims_treeParent rt ON rt.TypeId = c.TypeId
;

 --select * from ##temp_OUT_Claims;
 --select * from ##Claims_treeParent

INSERT INTO ##Claims_fullData (TypeId, parentId, TypeCode, parentTypeCode, RootId, StatusId, val)
SELECT 
	c.typeId,
	NULL AS parentId,
	c.TypeCode,
	N'type_' + rtrim(rt.RootId) + N'_parent',
	RootId,
	1 AS StatusId,
	0 AS val 
FROM ##temp_OUT_Claims c
INNER JOIN ##Claims_treeParent rt ON rt.TypeId = c.TypeId
WHERE rt.RootId NOT IN (SELECT RootId FROM ##Claims_fullData WHERE RootId IS NOT NULL)
GROUP BY c.typeId,
		 c.TypeCode,
		 RootId;

DELETE FROM @End_types;
INSERT INTO @End_types (Id, parentId, processed)
SELECT
DISTINCT 
	t.Id,
	t.parentId,
	0
FROM #Types_Tree t
INNER JOIN ##temp_OUT_Claims c ON c.TypeId = t.Id;

--SELECT * FROM @End_types;

DECLARE @FinalTypes TABLE (Id INT);
WHILE (SELECT COUNT(1) FROM @End_types WHERE processed <> 1) > 0
BEGIN
	SELECT TOP 1 
		@current_id = Id 
	FROM @End_types 
	WHERE processed <> 1;

	WITH ClaimType_Vals (Id, parentId)
		AS
		(
		    SELECT [Id], 
				   [Parent_сlaim_types_ID]
		    FROM dbo.Claim_types e
		    WHERE e.Id = @current_id
		    UNION ALL
			SELECT e.[Id], 
				   e.[Parent_сlaim_types_ID]
		    FROM dbo.Claim_types e
			INNER JOIN ClaimType_Vals r ON e.Id = r.parentId
			)

			INSERT INTO @FinalTypes
			SELECT 
				Id 
			FROM ClaimType_Vals
			WHERE Id NOT IN (SELECT Id FROM @FinalTypes);

			UPDATE @End_types 
				SET processed = 1 
			WHERE Id = @current_id;

END

UPDATE #Types_Tree 
	SET [HasChild] = 1 
WHERE [level] = 1;

SELECT 1 AS  Id, 0 AS parentId, N'' AS Caption, N'' AS DataFiled, 1 AS	HasChild, 0 AS [level]
UNION
SELECT 
	Id, 
	ISNULL(parentId,0) parentId, 
	IIF([Caption] = N'Типи', N'', [Caption]) [Caption],
	IIF(DataFiled = N'type_1', N'', DataFiled) DataFiled, 
	HasChild, 
	IIF(parentId = 1, 1, [level]) [level] 
FROM #Types_Tree
WHERE Id IN (SELECT Id FROM @FinalTypes) 
UNION 
SELECT
DISTINCT 
	t.Id+100000, 
	t.rootId, 
	N'Заявки з некінцевим типом' [Caption],
	DataFiled + N'_parent' DataFiled, 
	0, 
	[level]+1
FROM #Types_Tree t
WHERE Id IN (SELECT Id FROM @FinalTypes) 
AND [level]+1 = 2
UNION 
SELECT
DISTINCT 
	t.Id+110000, 
	t.rootId, 
	N'Всього' [Caption],
	DataFiled + N'_itog' DataFiled, 
	0, 
	[level]+1
FROM #Types_Tree t
WHERE Id IN (SELECT Id FROM @FinalTypes) 
AND [level]+1 = 2
ORDER BY [level],
		 parentId;