/*
DECLARE @user_id NVARCHAR(128) = 'b1410b5c-ad83-4047-beb8-7aba16eb400c',
  		@variant NVARCHAR(10) = 'short',
		@vision NVARCHAR(10) = 'short',
		@dateFrom DATETIME = '2020-10-01T00:00:00',
		@dateTo DATETIME = GETDATE(),
		@orgId NVARCHAR(MAX) = '28, 5502',
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
WITH ClaimTypes_Tree (Id, parentId, [Caption], DataFiled, HasChild, [level], TypeAccessID)
AS
( 
    SELECT [Id], 
		   [Parent_сlaim_types_ID], 
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
	[Caption], 
	DataFiled, 
	HasChild, 
	[level],
	TypeAccessID
INTO #Types_Tree
FROM ClaimTypes_Tree
WHERE [level] <> 0;

--select * from #Types_Tree order by level,parentId

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

-- перехідні
INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
SELECT
	Claim_type_ID,
	N'type_' + RTRIM(Claim_type_ID) claim_type_code, 
	Response_organization_ID,
	org.short_name, 
	1 AS statusId,
	COUNT(1) AS val
FROM dbo.Claims c 
INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
AND org.Id IN (SELECT Id FROM @orgList)
WHERE Claim_type_ID IN (SELECT Id FROM #Types_Tree WHERE HasChild = 0)
AND Created_at < @dateFrom 
AND ((CAST(Fact_finish_at AS DATE) < CAST(@dateFrom AS DATE)) OR (CAST(Fact_finish_at AS DATE) >= CAST(@dateFrom AS DATE) OR Fact_finish_at is null))

/*AND (Status_ID NOT IN (4,5,6) 
	OR (CAST(Fact_finish_at AS DATE) = CAST(@dateFrom AS DATE) 
	AND Status_ID IN (4,5,6) ))*/
GROUP BY Claim_type_ID,
		 Response_organization_ID,
		 Short_name;

-- надійшло
INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
SELECT
	Claim_type_ID,
	N'type_' + RTRIM(Claim_type_ID) claim_type_code, 
	Response_organization_ID,
	org.short_name, 
	2 AS StatusId,
	COUNT(1) AS val
FROM dbo.Claims c 
INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
AND org.Id IN (SELECT Id FROM @orgList)
WHERE Created_at <= @dateTo
AND Claim_type_ID IN (SELECT Id FROM #Types_Tree WHERE HasChild = 0)
AND Created_at BETWEEN @dateFrom AND @dateTo
GROUP BY Claim_type_ID,
		 Response_organization_ID,
		 Short_name;

-- виконано
INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
SELECT
	Claim_type_ID,
	N'type_' + RTRIM(Claim_type_ID) claim_type_code, 
	Response_organization_ID,
	org.short_name, 
	3 AS StatusId,
	COUNT(1) AS val 
FROM dbo.Claims c 
INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
AND org.Id IN (SELECT Id FROM @orgList)
WHERE Created_at <= @dateTo
AND Claim_type_ID IN (SELECT Id FROM #Types_Tree WHERE HasChild = 0)
AND Fact_finish_at IS NOT NULL 
AND Fact_finish_at BETWEEN @dateFrom AND @dateTo
--AND Status_ID IN (4,5,6) 
GROUP BY Claim_type_ID,
		 Response_organization_ID,
		 Short_name;

IF OBJECT_ID('tempdb..##ClaimStats') IS NOT NULL
BEGIN
	DROP TABLE ##ClaimStats;
END
-- залишилось
/*INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
SELECT
DISTINCT
	t0.TypeId,
	t0.TypeCode,
	t0.OrgId,
	t0.short_name,
	4,
	ISNULL(t1.val,0) + ISNULL(t2.val,0) - ISNULL(t3.val,0)
FROM ##temp_OUT_Claims t0
LEFT JOIN ##temp_OUT_Claims t1 ON t1.OrgId = t0.OrgId 
	AND t1.TypeId = t0.TypeId AND t1.StatusId = 1
LEFT JOIN ##temp_OUT_Claims t2 ON t2.OrgId = t0.OrgId 
	AND t2.TypeId = t0.TypeId AND t2.StatusId = 2
LEFT JOIN ##temp_OUT_Claims t3 ON t3.OrgId = t0.OrgId 
	AND t3.TypeId = t0.TypeId AND t3.StatusId = 3;*/
INSERT INTO ##temp_OUT_Claims (TypeId, TypeCode, OrgId, short_name, StatusId, val)
SELECT
	Claim_type_ID,
	N'type_' + RTRIM(Claim_type_ID) claim_type_code, 
	Response_organization_ID,
	org.short_name, 
	4 AS StatusId,
	COUNT(1) AS val 
FROM dbo.Claims c 
INNER JOIN dbo.Organizations org ON org.Id = c.Response_organization_ID 
AND org.Id IN (SELECT Id FROM @orgList)
WHERE Created_at <= @dateTo
AND Claim_type_ID IN (SELECT Id FROM #Types_Tree WHERE HasChild = 0)
AND (Fact_finish_at IS NULL OR CAST(Fact_finish_at AS DATE) > CAST(@dateTo AS DATE))
GROUP BY Claim_type_ID,
		 Response_organization_ID,
		 Short_name;


--SELECT * FROM ##temp_OUT_Claims;


IF (@vision = 'full') 
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

DECLARE @End_types TABLE (Id INT, parentId INT, processed BIT);
INSERT INTO @End_types (Id, parentId, processed)
SELECT 
DISTINCT 
	typeId,
	parentId,
	0
FROM ##temp_OUT_Claims c
INNER JOIN #Types_Tree t ON c.TypeId = t.Id ;

DECLARE @current_id INT;
DECLARE @RootTypes TABLE (Id INT, rootId INT);
DECLARE @StepTypes TABLE (Id INT, parentId INT);

WHILE (SELECT COUNT(1) FROM @End_types WHERE processed <> 1) > 0
BEGIN
SET @current_id = (SELECT TOP 1 Id FROM @End_types WHERE processed = 0);

WITH EndTypes_tree (Id, parentId)
		AS
		(
		SELECT 
			Id, 
			Parent_сlaim_types_ID
		FROM dbo.Claim_types e
		WHERE e.Id = @current_id 
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

		INSERT INTO @RootTypes
		SELECT 
			@current_id, 
			Id rootId 
		FROM @StepTypes
		WHERE parentId = 1;

		UPDATE @End_types 
		SET processed = 1 
		WHERE Id = @current_id;

		DELETE FROM @StepTypes;
END

-- select * from @RootTypes

UPDATE c
	SET c.parentTypeCode = N'type_' + RTRIM(rt.rootId) + N'_itog'
FROM ##temp_OUT_Claims c
INNER JOIN @RootTypes rt ON rt.Id = c.TypeId
;

-- select * from ##temp_OUT_Claims;

DECLARE @activeVal AS NVARCHAR(MAX),
		@activeVal2 AS NVARCHAR(MAX),
		@activeVal_itog AS NVARCHAR(MAX),
		@activeVal2_itog AS NVARCHAR(MAX);

SET @activeVal = LEFT((SELECT '['+RTRIM(TypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY TypeCode FOR XML PATH('')),len((SELECT '['+rtrim(TypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY TypeCode FOR XML PATH('')))-1);
SET @activeVal2 = LEFT((SELECT 'isnull(['+RTRIM(TypeCode)+'],0) as ['+rtrim(TypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY TypeCode FOR XML PATH('')),len((SELECT 'isnull(['+rtrim(TypeCode)+'],0) as ['+rtrim(TypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY TypeCode FOR XML PATH('')))-1);

SET @activeVal_itog = LEFT((SELECT '['+RTRIM(parentTypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY parentTypeCode FOR XML PATH('')),len((SELECT '['+rtrim(parentTypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY parentTypeCode FOR XML PATH('')))-1);
SET @activeVal2_itog = LEFT((SELECT 'isnull(['+RTRIM(parentTypeCode)+'],0) as ['+rtrim(parentTypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY parentTypeCode FOR XML PATH('')),len((SELECT 'isnull(['+rtrim(parentTypeCode)+'],0) as ['+rtrim(parentTypeCode)+']' + ',' FROM ##temp_OUT_Claims GROUP BY parentTypeCode FOR XML PATH('')))-1);


DECLARE @sql NVARCHAR(MAX) = N'
SELECT 
	ROW_NUMBER() OVER (ORDER BY (SELECT 1)) as Id,
	pvt.OrgId AS orgId,
	IIF(status_name <> ''перехідні'', SPACE(1), short_name) as short_name,
	status_name,
	'+@activeVal2+N',
	'+@activeVal2_itog+N'
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
 ';

EXECUTE (@sql);

------> Prev. version <--------
/*
DECLARE @user_id NVARCHAR(128) = 'b1410b5c-ad83-4047-beb8-7aba16eb400c',
  		@variant NVARCHAR(10) = 'short',
		@vision NVARCHAR(10) = 'short',
		@dateFrom DATETIME = '2020-09-30T21:00:00',
		@dateTo DATETIME = GETDATE(),
		@orgId NVARCHAR(MAX) = '6203',
		@accessId INT = 2;

DECLARE @UserAccessKey TABLE (val INT);
IF (@accessId IS NOT NULL)
BEGIN
	INSERT INTO @UserAccessKey
	SELECT @accessId
	UNION 
	SELECT 103;
END
ELSE 
BEGIN
	INSERT INTO @UserAccessKey
	SELECT 
		[Key]
	FROM [CRM_AVR_System].[dbo].[OrganisationStructureRightsFilterKey] fk
	INNER JOIN [CRM_AVR_System].[dbo].[OrganisationStructureRightsFilter] rf ON fk.RightsFilterId = rf.Id
		AND DataSourceQueryCode = 'GlobalFilter_ClaimTypes'
	INNER JOIN [CRM_AVR_System].[dbo].[UserInOrganisation] os ON os.OrganisationStructureId = rf.OrganisationStructureId
		AND os.UserId = @user_id;
END

IF OBJECT_ID ('tempdb..#Types_Tree') IS NOT NULL
BEGIN
	DROP TABLE #Types_Tree;
END

;
WITH ClaimTypes_Tree (Id, parentId, [Caption], DataFiled, HasChild, [level])
AS
( 
    SELECT [Id], 
		   [Parent_сlaim_types_ID], 
		   [Name],
		   'type_' + CAST(e.Id AS NVARCHAR(10)),
		   IIF(EXISTS(SELECT Id FROM dbo.[Claim_types] WHERE [Parent_сlaim_types_ID] = e.Id), 1, 0),
		   0 
    FROM dbo.[Claim_types] e
	INNER JOIN @UserAccessKey access ON e.TypeAccess_ID = access.val
    WHERE e.Id = 1 
    UNION ALL
	SELECT
		   e.[Id], 
		   e.[Parent_сlaim_types_ID], 
		   e.[Name], 
		   'type_' + CAST(e.Id AS NVARCHAR(10)),
		   IIF(EXISTS(SELECT Id FROM dbo.[Claim_types] WHERE [Parent_сlaim_types_ID] = e.Id), 1, 0),
		   r.level + 1 
    FROM dbo.[Claim_types] e
	INNER JOIN @UserAccessKey access ON e.TypeAccess_ID = access.val
    INNER JOIN ClaimTypes_Tree r ON e.Parent_сlaim_types_ID = r.Id
)
SELECT 
	Id, 
	parentId, 
	[Caption], 
	DataFiled, 
	HasChild, 
	[level]
INTO #Types_Tree
FROM ClaimTypes_Tree
WHERE [level] <> 0;

IF (@variant = 'short')
BEGIN
DELETE FROM #Types_Tree
WHERE [level] > 2;

UPDATE #Types_Tree 
SET [HasCHild] = IIF([level] = 2, 0, 1);
END

DECLARE @DataField TABLE (DataField NVARCHAR(MAX), val INT);
INSERT INTO @DataField
SELECT 
	DataFiled,
	0
FROM #Types_Tree
WHERE HasChild = 0;

DECLARE @cols AS NVARCHAR(MAX),
		@query  AS NVARCHAR(MAX);

DECLARE @dateFinishPrev DATETIME = (SELECT DATEADD(DAY, DATEDIFF(DAY, 1, @dateTo), '23:59:59'));
DECLARE @dateFinishOnly DATE = CAST(@dateTo AS DATE);
DECLARE @orgList TABLE (Id INT);
INSERT INTO @orgList
SELECT 
	value
FROM STRING_SPLIT(REPLACE(@orgId,' ', SPACE(0)),',');

DECLARE @Status TABLE (status_name NVARCHAR(100), sort TINYINT);
INSERT INTO @Status
SELECT N'перехідні', 1
UNION
SELECT N'надійшло', 2
UNION
SELECT N'виконано', 3 
UNION
SELECT N'залишилось', 4;


DECLARE @Organizations TABLE (Id INT, short_name NVARCHAR(500));
INSERT INTO @Organizations
SELECT 
	Id,
	Short_name
FROM dbo.[Organizations] 
WHERE 
Id IN (SELECT Id FROM @orgList);

IF OBJECT_ID('tempdb..#DataFields_table') IS NOT NULL
BEGIN
	DROP TABLE #DataFields_table;
END

CREATE TABLE #DataFields_table (orgId INT,
								short_name NVARCHAR(500), 
								typeId INT, 
								DataField NVARCHAR(MAX), 
								status_name NVARCHAR(10), 
								val INT, 
								processed BIT, 
								sort TINYINT)
								WITH (DATA_COMPRESSION = PAGE); 
INSERT INTO #DataFields_table
SELECT 
	org.Id,
	org.short_name,
	tree.Id,
	tree.DataFiled,
	stat.status_name,
	0,
	0,
	stat.sort
FROM #Types_Tree tree
CROSS JOIN @Status stat
LEFT JOIN @Organizations org ON 1=1
WHERE HasChild = 0;


DECLARE @types_list TABLE (Id INT);
INSERT INTO @types_list 
SELECT DISTINCT 
	typeId 
FROM #DataFields_table;

DECLARE @TypeOrgStatus_value TABLE (typeId INT, orgId INT, status_name NVARCHAR(10), val INT);

IF (@variant = 'short')
BEGIN
DECLARE @currentId INT;
DECLARE @stepTypes TABLE (Id INT);

	WHILE (SELECT COUNT(1) FROM @types_list) > 0
	BEGIN
	SET @currentId = (SELECT TOP 1 Id FROM @types_list);

	WITH ClaimType_Vals (Id, parentId)
	AS
	(
	    SELECT [Id], 
			   [Parent_сlaim_types_ID]
	    FROM dbo.Claim_types e
	    WHERE e.Id = @currentId
	    UNION ALL
		SELECT
			   e.[Id], 
			   e.[Parent_сlaim_types_ID]
	    FROM dbo.Claim_types e 
	    INNER JOIN ClaimType_Vals r ON e.Parent_сlaim_types_ID = r.Id
	)

	INSERT INTO @stepTypes
	SELECT 
		Id
	FROM ClaimType_Vals;

	-- виконано
	DELETE FROM @TypeOrgStatus_value;
	INSERT INTO @TypeOrgStatus_value
	SELECT 
	 @currentId,
	 claim.Response_organization_ID,
	 data.status_name,
	 COUNT(claim.Id)
	FROM dbo.[Claims] claim
	INNER JOIN #DataFields_table [data] ON data.[orgId] = claim.[Response_organization_ID]		
	WHERE 
	claim.[Claim_type_ID] IN (SELECT Id FROM @stepTypes)
	AND [data].status_name = N'виконано' 
	AND [data].typeId = @currentId
	AND claim.Fact_finish_at IS NOT NULL 
	AND CAST(claim.Fact_finish_at AS DATE) = @dateFinishOnly 
	AND claim.Status_ID IN (4,5,6) 
	GROUP BY claim.Claim_type_ID,
			 claim.Response_organization_ID,
			 data.status_name;

	UPDATE [data]
		SET val = [value].val
	FROM #DataFields_table [data]
	INNER JOIN @TypeOrgStatus_value [value] ON [data].orgId = [value].orgId
	AND [data].typeId = @currentId
	AND [data].orgId = [value].orgId
	AND [data].status_name = [value].status_name;

	-- перехідні
	DELETE FROM @TypeOrgStatus_value;
	INSERT INTO @TypeOrgStatus_value
	SELECT 
	DISTINCT
	 @currentId,
	 claim.Response_organization_ID,
	 [data].status_name,
	 COUNT(claim.Id) AS val
	FROM dbo.[Claims] claim
	INNER JOIN #DataFields_table [data] ON [data].[orgId] = claim.[Response_organization_ID]
	WHERE 
	claim.[Claim_type_ID] IN (SELECT Id FROM @stepTypes)
	AND [data].status_name = N'перехідні' 
	AND [data].typeId = @currentId
	AND claim.Created_at BETWEEN @dateFrom AND @dateFinishPrev 
	AND (claim.Status_ID <> 5 
	OR (CAST(claim.Fact_finish_at AS DATE) = CAST(@dateTo AS DATE) 
		AND claim.Status_ID = 5 ))
	GROUP BY claim.Response_organization_ID,
			 [data].status_name;

	UPDATE [data]
		SET val = [value].val
	FROM #DataFields_table [data]
	INNER JOIN @TypeOrgStatus_value [value] ON [data].orgId = [value].orgId
	AND [data].typeId = @currentId
	AND [data].orgId = [value].orgId
	AND [data].status_name = [value].status_name;

	-- надійшло
	DELETE FROM @TypeOrgStatus_value;
	INSERT INTO @TypeOrgStatus_value
	SELECT 
	 @currentId,
	 claim.Response_organization_ID,
	 [data].status_name,
	 COUNT(claim.Id) AS val
	FROM #DataFields_table [data] 
	INNER JOIN dbo.[Claims] claim ON [data].[orgId] = claim.[Response_organization_ID]
	WHERE 
	claim.[Claim_type_ID] IN (SELECT Id FROM @stepTypes)
	AND [data].status_name = N'надійшло'
	AND [data].typeId = @currentId
	AND CAST(claim.Created_at AS DATE) = @dateFinishOnly
	GROUP BY claim.Claim_type_ID, 
			 claim.Response_organization_ID,
			 [data].status_name;

	UPDATE [data]
		SET val = [value].val
	FROM #DataFields_table [data]
	INNER JOIN @TypeOrgStatus_value [value] ON [data].orgId = [value].orgId
	AND [data].typeId = @currentId
	AND [data].orgId = [value].orgId
	AND [data].status_name = [value].status_name;

		-- залишилось
	UPDATE [data]
		SET val = (z_p.val + z_n.val) - z_v.val
	FROM #DataFields_table [data]
	LEFT JOIN #DataFields_table z_v ON [data].orgId = z_v.orgId
		AND [data].typeId = z_v.typeId 
		AND z_v.status_name = N'виконано'
	LEFT JOIN #DataFields_table z_n ON [data].orgId = z_n.orgId
		AND [data].typeId = z_n.typeId 
		AND z_n.status_name = N'надійшло'
	LEFT JOIN #DataFields_table z_p ON [data].orgId = z_p.orgId
		AND [data].typeId = z_p.typeId 
		AND z_p.status_name = N'перехідні'
	WHERE [data].typeId = @currentId
		AND [data].status_name = N'залишилось';

	DELETE FROM @stepTypes;
	
	DELETE FROM @types_list 
	WHERE Id = @currentId;

	END
END
ELSE 
BEGIN

	-- виконано
	INSERT INTO @TypeOrgStatus_value
	SELECT 
		claim_v.Claim_type_ID,
		claim_v.Response_organization_ID,
		N'виконано' AS status_name,
		COUNT(claim_v.Id) AS val
	FROM dbo.[Claims] claim_v
	INNER JOIN @organizations org ON org.Id = claim_v.Response_organization_ID
		AND claim_v.Fact_finish_at IS NOT NULL
		AND CAST(claim_v.Fact_finish_at AS DATE) = @dateFinishOnly 
		AND claim_v.Status_ID IN (4,5,6)
	INNER JOIN @types_list [types] ON [types].Id = claim_v.Claim_type_ID
	GROUP BY claim_v.Claim_type_ID,
			 claim_v.Response_organization_ID
			;


	-- перехідні
	INSERT INTO @TypeOrgStatus_value
	SELECT 
		claim_p.Claim_type_ID,
		claim_p.Response_organization_ID,
		N'перехідні' AS status_name,
		COUNT(claim_p.Id) AS val
	FROM dbo.[Claims] claim_p
	INNER JOIN @organizations org ON org.Id = claim_p.Response_organization_ID
		AND claim_p.Created_at BETWEEN @dateFrom AND @dateFinishPrev 
	AND (claim_p.Status_ID <> 5 
	OR (CAST(claim_p.Fact_finish_at AS DATE) = CAST(@dateTo AS DATE) 
		AND claim_p.Status_ID = 5 ))
	INNER JOIN @types_list [types] ON [types].Id = claim_p.Claim_type_ID
	GROUP BY claim_p.Claim_type_ID,
			 claim_p.Response_organization_ID
			;

	-- надійшло
	INSERT INTO @TypeOrgStatus_value
	SELECT 
		claim_n.Claim_type_ID,
		claim_n.Response_organization_ID,
		N'надійшло' AS status_name,
		COUNT(claim_n.Id) AS val
	FROM dbo.[Claims] claim_n
	INNER JOIN @organizations org ON org.Id = claim_n.Response_organization_ID
		AND CAST(claim_n.Created_at AS DATE) = @dateFinishOnly 
	INNER JOIN @types_list [types] ON [types].Id = claim_n.Claim_type_ID
	GROUP BY claim_n.Claim_type_ID,
			 claim_n.Response_organization_ID
			 ;

		-- залишилось
	INSERT INTO @TypeOrgStatus_value
	SELECT 
		all_.typeId,
		all_.orgId,
		N'залишилось',
		(ISNULL(per.val,0) + ISNULL(nad.val,0)) - ISNULL(vyk.val,0) AS val
	FROM @TypeOrgStatus_value all_
	LEFT JOIN @TypeOrgStatus_value per ON per.typeId = all_.typeId
		AND per.orgId = all_.orgId
		AND all_.status_name = N'перехідні'
	LEFT JOIN @TypeOrgStatus_value nad ON nad.typeId = all_.typeId
		AND nad.orgId = all_.orgId
		AND all_.status_name = N'надійшло'
	LEFT JOIN @TypeOrgStatus_value vyk ON vyk.typeId = all_.typeId
		AND vyk.orgId = all_.orgId
		AND all_.status_name = N'виконано' 
		;

	UPDATE [data]
		SET val = [value].val
	FROM #DataFields_table [data]
	INNER JOIN @TypeOrgStatus_value [value] ON [data].orgId = [value].orgId
	AND [data].typeId = [value].typeId
	AND [data].orgId = [value].orgId
	AND [data].status_name = [value].status_name;

END
	
	IF (@vision <> 'full') 
		OR @vision IS NULL
	BEGIN
		DECLARE @ForDelete TABLE (typeId INT, val INT);
		INSERT INTO @ForDelete 
		SELECT 
			typeId,
			SUM(val)
		FROM #DataFields_table
		GROUP BY typeId;
		
		DELETE FROM #DataFields_table
		WHERE typeId IN (SELECT 
							typeId
						 FROM @ForDelete
						 WHERE val = 0);
	END

	UPDATE #DataFields_table
		SET short_name = ''
	WHERE status_name <> N'перехідні';

SET @cols = STUFF((SELECT DISTINCT ',' + QUOTENAME(c.DataField) 
            FROM #DataFields_table c
            FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)') 
        ,1,1,'');

SET @query = N'
SELECT
	ROW_NUMBER() OVER (ORDER BY (SELECT 1)) as Id,
	* 
FROM (
	SELECT 
		orgId,
		short_name,
		status_name,
		sort,
		DataField,
		val
	FROM #DataFields_table
) data_
PIVOT (
  SUM(val)
  FOR DataField
  IN (' + @cols + ')
) AS DATA_Pivot
  ORDER BY orgId,
			sort;


';

EXEC (@query);
*/