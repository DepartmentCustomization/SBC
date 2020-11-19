/*
DECLARE @user_id NVARCHAR(128) = 'b1410b5c-ad83-4047-beb8-7aba16eb400c',
  		@variant NVARCHAR(10) = 'short',
		@vision NVARCHAR(10) = 'short',
		@dateFrom DATETIME = '2020-11-18T00:00:00',
		@dateTo DATETIME = GETDATE(),
		@orgId NVARCHAR(MAX) = '28, 5502, 5503',
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

--select * from #Types_Tree order by level,parentId

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

INSERT INTO ##Claims_treeParent (TypeId, parentId, RootId)
SELECT 
	Id,
	parentId,
	RootId
FROM #Types_Tree
WHERE HasChild = 1;
	    
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
WHERE Claim_type_ID IN (SELECT TypeId FROM ##Claims_treeParent)
AND Created_at < @dateFrom 
AND (Fact_finish_at < @dateFrom
	OR (Fact_finish_at >= @dateFrom 
	OR Fact_finish_at is null))
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
AND Claim_type_ID IN (SELECT TypeId FROM ##Claims_treeParent)
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
AND Claim_type_ID IN (SELECT TypeId FROM ##Claims_treeParent)
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
AND org.Id IN (SELECT TypeId FROM ##Claims_treeParent)
WHERE Created_at <= @dateTo
AND Claim_type_ID IN (SELECT Id FROM ##Claims_treeParent)
AND (Fact_finish_at IS NULL OR CAST(Fact_finish_at AS DATE) > CAST(@dateTo AS DATE))
GROUP BY Claim_type_ID,
 Response_organization_ID,
 Short_name;

 UPDATE d
	SET RootId = t.RootId,
		parentTypeCode = N'type_' + RTRIM(t.RootId) + N'_parent',
		TypeCode = N'type_' + RTRIM(d.typeId)
 FROM ##Claims_fullData d
 INNER JOIN ##Claims_treeParent t ON t.TypeId = d.TypeId

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
			@current_id,
			N'type_' + RTRIM(Claim_type_ID) claim_type_code, 
			Response_organization_ID,
			org.short_name, 
			1 AS statusId,
			COUNT(1) AS val
		FROM dbo.Claims c 
		INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
		AND org.Id IN (SELECT Id FROM @orgList)
		WHERE Claim_type_ID IN (SELECT Id FROM @StepTypes)
		AND Created_at < @dateFrom 
		AND (Fact_finish_at < @dateFrom
			OR (Fact_finish_at >= @dateFrom 
			OR Fact_finish_at is null))
		GROUP BY Claim_type_ID,
				 Response_organization_ID,
				 Short_name;
		
		-- надійшло
		INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
		SELECT
			@current_id,
			N'type_' + RTRIM(Claim_type_ID) claim_type_code, 
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
		GROUP BY Claim_type_ID,
				 Response_organization_ID,
				 Short_name;
		
		-- виконано
		INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
		SELECT
			@current_id,
			N'type_' + RTRIM(Claim_type_ID) claim_type_code, 
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
		GROUP BY Claim_type_ID,
				 Response_organization_ID,
				 Short_name;
		
		-- залишилось
		INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
		SELECT
			@current_id,
			N'type_' + RTRIM(Claim_type_ID) claim_type_code, 
			Response_organization_ID,
			org.short_name, 
			4 AS StatusId,
			COUNT(1) AS val 
		FROM dbo.Claims c 
		INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
		AND org.Id IN (SELECT Id FROM @orgList)
		WHERE Created_at <= @dateTo
		AND Claim_type_ID IN (SELECT Id FROM @StepTypes)
		AND (Fact_finish_at IS NULL OR CAST(Fact_finish_at AS DATE) > CAST(@dateTo AS DATE))
		GROUP BY Claim_type_ID,
		 Response_organization_ID,
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
		SUM(val)
	FROM ##temp_OUT_Claims
	GROUP BY typeId;
	
	DELETE FROM ##temp_OUT_Claims
	WHERE typeId IN (SELECT 
						typeId
					 FROM @ForDelete
					 WHERE val = 0);
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

-- select * from @RootTypes;

UPDATE c
	SET c.parentTypeCode = N'type_' + RTRIM(rt.rootId) + N'_itog'
FROM ##temp_OUT_Claims c
INNER JOIN ##Claims_treeParent rt ON rt.TypeId = c.TypeId
;

 --select * from ##temp_OUT_Claims;
 --select * from ##Claims_treeParent

DECLARE @activeVal AS NVARCHAR(MAX),
		@activeVal2 AS NVARCHAR(MAX),
		@activeVal_itog AS NVARCHAR(MAX),
		@activeVal2_itog AS NVARCHAR(MAX),
		@activeVal_parent AS NVARCHAR(MAX),
		@activeVal2_parent AS NVARCHAR(MAX);

SET @activeVal = LEFT((SELECT '['+RTRIM(TypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY TypeCode FOR XML PATH('')),len((SELECT '['+rtrim(TypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY TypeCode FOR XML PATH('')))-1);
SET @activeVal2 = LEFT((SELECT 'isnull(['+RTRIM(TypeCode)+'],0) as ['+rtrim(TypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY TypeCode FOR XML PATH('')),len((SELECT 'isnull(['+rtrim(TypeCode)+'],0) as ['+rtrim(TypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY TypeCode FOR XML PATH('')))-1);

SET @activeVal_itog = LEFT((SELECT '['+RTRIM(parentTypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY parentTypeCode FOR XML PATH('')),len((SELECT '['+rtrim(parentTypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY parentTypeCode FOR XML PATH('')))-1);
SET @activeVal2_itog = LEFT((SELECT 'isnull(['+RTRIM(parentTypeCode)+'],0) as ['+rtrim(parentTypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY parentTypeCode FOR XML PATH('')),len((SELECT 'isnull(['+rtrim(parentTypeCode)+'],0) as ['+rtrim(parentTypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY parentTypeCode FOR XML PATH('')))-1);

SET @activeVal_parent = LEFT((SELECT '['+RTRIM(parentTypeCode)+']' + ',' FROM ##Claims_fullData GROUP BY parentTypeCode FOR XML PATH('')),len((SELECT '['+rtrim(parentTypeCode)+']' + ',' FROM ##Claims_fullData GROUP BY parentTypeCode FOR XML PATH('')))-1);
SET @activeVal2_parent = LEFT((SELECT 'isnull(['+RTRIM(parentTypeCode)+'],0) as ['+rtrim(parentTypeCode)+']' + ',' FROM ##Claims_fullData GROUP BY parentTypeCode FOR XML PATH('')),len((SELECT 'isnull(['+rtrim(parentTypeCode)+'],0) as ['+rtrim(parentTypeCode)+']' + ',' FROM ##Claims_fullData GROUP BY parentTypeCode FOR XML PATH('')))-1);

DECLARE @sql NVARCHAR(MAX) = N'
SELECT 
	ROW_NUMBER() OVER (ORDER BY (SELECT 1)) as Id,
	pvt.OrgId AS orgId,
	IIF(status_name <> ''перехідні'', SPACE(1), short_name) as short_name,
	status_name,
	'+@activeVal2+N',
	'+@activeVal2_itog+N',
	'+@activeVal2_parent+N'
FROM   
(SELECT 
	SUM(ISNULL(sub.val,0)) AS val, 
	sub.TypeCode, 
	main.OrgId, 
	main.short_name, 
	main.sort AS StatusId, 
	main.status_name
FROM (SELECT * 
FROM (SELECT OrgId, short_name 
FROM ##temp_OUT_Claims
GROUP BY OrgId, short_name) t1 
CROSS JOIN ##temp_status) main
LEFT JOIN ##temp_OUT_Claims sub ON sub.OrgId = main.OrgId
	AND sub.StatusId = main.sort
GROUP BY sub.TypeCode, 
	main.OrgId, 
	main.short_name, 
	main.sort, 
	main.status_name
) p  
PIVOT  
(  
SUM (val)  
FOR TypeCode IN  
('+@activeVal+N')  
) AS pvt 

LEFT JOIN (
---P2
SELECT 
	OrgId,
	StatusId,
	'+@activeVal2_itog+N'
FROM   
(SELECT 
	SUM(ISNULL(sub.val,0)) AS val,
	main.OrgId, 
	main.short_name, 
	main.sort AS StatusId, 
	main.status_name,
	sub.parentTypeCode
FROM (SELECT * 
FROM (SELECT OrgId, short_name 
FROM ##temp_OUT_Claims
GROUP BY OrgId, short_name) t1 
CROSS JOIN ##temp_status) main
LEFT JOIN ##temp_OUT_Claims sub ON sub.OrgId = main.OrgId
	AND sub.StatusId = main.sort
GROUP BY sub.TypeCode, 
	main.OrgId, 
	main.short_name, 
	main.sort, 
	main.status_name,
	sub.parentTypeCode
) p  
PIVOT  
(  
SUM (val)  
FOR parentTypeCode IN  
('+@activeVal_itog+N')  
) AS pvt 
 ) AS p_itog ON p_itog.OrgId = pvt.OrgId 
 AND p_itog.StatusId = pvt.StatusId

 LEFT JOIN (
---P3
SELECT 
	OrgId,
	StatusId,
	'+@activeVal2_parent+N'
FROM   
(SELECT 
	SUM(ISNULL(sub.val,0)) AS val,
	main.OrgId, 
	main.short_name, 
	main.sort AS StatusId, 
	main.status_name,
	sub.parentTypeCode
FROM (SELECT * 
FROM (SELECT OrgId, NULL AS short_name 
FROM ##Claims_fullData
GROUP BY OrgId) t1 
CROSS JOIN ##temp_status) main
LEFT JOIN ##Claims_fullData sub ON sub.OrgId = main.OrgId
	AND sub.StatusId = main.sort
GROUP BY sub.TypeCode, 
	main.OrgId, 
	main.short_name, 
	main.sort, 
	main.status_name,
	sub.parentTypeCode
) p  
PIVOT  
(  
SUM (val)  
FOR parentTypeCode IN  
('+@activeVal_parent+N')  
) AS pvt 
 ) AS p_parent ON p_parent.OrgId = pvt.OrgId 
 AND p_parent.StatusId = pvt.StatusId
 ';

EXECUTE (@sql);