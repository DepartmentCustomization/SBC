/*
DECLARE @user_id NVARCHAR(128) = 'b1410b5c-ad83-4047-beb8-7aba16eb400c',
  		@variant NVARCHAR(10) = 'short',
		@vision NVARCHAR(10) = 'short',
		@dateFrom DATETIME = DATEADD(DAY, -60, GETDATE()),
		@dateTo DATETIME = GETDATE(),
		@orgId NVARCHAR(MAX) = '28,5502,5503,5504';
*/

DECLARE @UserAccessKey TABLE (val INT);
INSERT INTO @UserAccessKey
SELECT 
	[Key]
FROM [CRM_AVR_System].[dbo].[OrganisationStructureRightsFilterKey] fk
INNER JOIN [CRM_AVR_System].[dbo].[OrganisationStructureRightsFilter] rf ON fk.RightsFilterId = rf.Id
	AND DataSourceQueryCode = 'GlobalFilter_ClaimTypes'
INNER JOIN [CRM_AVR_System].[dbo].[UserInOrganisation] os ON os.OrganisationStructureId = rf.OrganisationStructureId
	AND os.UserId = @user_id;

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

SET @cols = STUFF((SELECT DISTINCT ',' + QUOTENAME(c.DataField) 
            FROM @DataField c
            FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)') 
        ,1,1,'');

SET @query = N'
DECLARE @dateFinishPrev DATETIME = (SELECT DATEADD(DAY, DATEDIFF(DAY, 1, @dateTo), ''23:59:59''));
DECLARE @dateFinishOnly DATE = CAST(@dateTo AS DATE);
DECLARE @orgList TABLE (Id INT);
INSERT INTO @orgList
SELECT 
	value
FROM STRING_SPLIT(REPLACE(@orgId,'' '', SPACE(0)),'','');
DECLARE @UserAccessKey TABLE (val INT);
INSERT INTO @UserAccessKey
SELECT 
	[Key]
FROM [CRM_AVR_System].[dbo].[OrganisationStructureRightsFilterKey] fk
INNER JOIN [CRM_AVR_System].[dbo].[OrganisationStructureRightsFilter] rf ON fk.RightsFilterId = rf.Id
	AND DataSourceQueryCode = ''GlobalFilter_ClaimTypes''
INNER JOIN [CRM_AVR_System].[dbo].[UserInOrganisation] os ON os.OrganisationStructureId = rf.OrganisationStructureId
	AND os.UserId = @user_id;

IF OBJECT_ID (''tempdb..#Types_Tree'') IS NOT NULL
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
		   ''type_'' + CAST(e.Id AS NVARCHAR(10)),
		   IIF(EXISTS(SELECT Id FROM Claim_Types WHERE [Parent_сlaim_types_ID] = e.Id), 1, 0),
		   0 
    FROM Claim_types e
	INNER JOIN @UserAccessKey access ON e.TypeAccess_ID = access.val
    WHERE e.Id = 1 
    UNION ALL
	SELECT
		   e.[Id], 
		   e.[Parent_сlaim_types_ID], 
		   e.[Name], 
		   ''type_'' + CAST(e.Id AS NVARCHAR(10)),
		   IIF(EXISTS(SELECT Id FROM Claim_Types WHERE [Parent_сlaim_types_ID] = e.Id), 1, 0),
		   r.level + 1 
    FROM Claim_types e
	INNER JOIN @UserAccessKey access ON e.TypeAccess_ID = access.val
    INNER JOIN ClaimTypes_Tree r ON e.Parent_сlaim_types_ID = r.Id
)
SELECT 
	*
INTO #Types_Tree
FROM ClaimTypes_Tree
WHERE [level] <> 0;

IF (@variant = ''short'')
BEGIN
DELETE FROM #Types_Tree
WHERE [level] > 2;

UPDATE #Types_Tree 
SET [HasCHild] = IIF([level] = 2, 0, 1);
END

--select * from #Types_Tree

DECLARE @Status TABLE (status_name NVARCHAR(100), sort TINYINT);
INSERT INTO @Status
SELECT ''перехідні'', 1
UNION
SELECT ''надійшло'', 2
UNION
SELECT ''виконано'', 3 
UNION
SELECT ''залишилось'', 4;


DECLARE @Organizations TABLE (Id INT, short_name NVARCHAR(500));
INSERT INTO @Organizations
SELECT 
	Id,
	Short_name
FROM dbo.[Organizations] 
WHERE 
Id IN (SELECT Id FROM @orgList);

DECLARE @DataFields_table TABLE (orgId INT, short_name NVARCHAR(500), typeId INT, DataField NVARCHAR(MAX), status_name NVARCHAR(10), val INT, processed BIT, sort TINYINT);
INSERT INTO @DataFields_table
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
FROM @DataFields_table;

DECLARE @currentId INT;
DECLARE @stepTypes TABLE (Id INT);
DECLARE @TypeOrgStatus_value TABLE (typeId INT, orgId INT, status_name NVARCHAR(10), val INT);
DECLARE @Zalyshok_vyk TABLE (typeId INT, orgId INT, val INT);
DECLARE @Zalyshok_nad TABLE (typeId INT, orgId INT, val INT);
DECLARE @Zalyshok_per TABLE (typeId INT, orgId INT, val INT);
DECLARE @Zalyshok_res TABLE (typeId INT, orgId INT, val INT);

	WHILE (SELECT COUNT(1) FROM @types_list) > 0
	BEGIN
	SET @currentId = (SELECT TOP 1 Id FROM @types_list);

	IF (@variant = ''short'')
	BEGIN

	WITH ClaimType_Vals (Id, parentId)
	AS
	(
	    SELECT [Id], 
			   [Parent_сlaim_types_ID]
	    FROM Claim_types e
	    WHERE e.Id = @currentId
	    UNION ALL
		SELECT
			   e.[Id], 
			   e.[Parent_сlaim_types_ID]
	    FROM Claim_types e
	    INNER JOIN ClaimType_Vals r ON e.Parent_сlaim_types_ID = r.Id
	)

	INSERT INTO @stepTypes
	SELECT 
		Id
	FROM ClaimType_Vals
	END
	ELSE
	BEGIN
		INSERT INTO @stepTypes
		SELECT @currentId;
	END


	-- виконано
	DELETE FROM @TypeOrgStatus_value;
	INSERT INTO @TypeOrgStatus_value
	SELECT 
	 @currentId,
	 claim.Response_organization_ID,
	 data.status_name,
	 COUNT(claim.Id)
	FROM dbo.[Claims] claim
	INNER JOIN @DataFields_table data ON data.[orgId] = claim.[Response_organization_ID]		
	WHERE 
	claim.[Claim_type_ID] IN (SELECT Id FROM @stepTypes)
	AND data.status_name = ''виконано'' 
	AND data.typeId = @currentId
	AND claim.Fact_finish_at is not null 
	AND CAST(claim.Fact_finish_at AS DATE) = @dateFinishOnly 
	AND claim.Status_ID in (4,5,6) 
	GROUP BY claim.Claim_type_ID,
			 claim.Response_organization_ID,
			 data.status_name;

	UPDATE data
		SET val = value.val
	FROM @DataFields_table data
	INNER JOIN @TypeOrgStatus_value value ON data.orgId = value.orgId
	AND data.typeId = @currentId
	AND data.orgId = value.orgId
	AND data.status_name = value.status_name;

	-- перехідні
	DELETE FROM @TypeOrgStatus_value;
	INSERT INTO @TypeOrgStatus_value
	SELECT 
	 @currentId,
	 claim.Response_organization_ID,
	 data.status_name,
	 COUNT(claim.Id) AS val
	FROM dbo.[Claims] claim
	INNER JOIN @DataFields_table data ON data.[orgId] = claim.[Response_organization_ID]
	WHERE 
	claim.[Claim_type_ID] IN (SELECT Id FROM @stepTypes)
	AND data.status_name = ''перехідні'' 
	AND data.typeId = @currentId
	AND claim.Created_at BETWEEN @dateFrom and @dateFinishPrev 
	AND (claim.Fact_finish_at IS NULL OR CAST(claim.Fact_finish_at AS DATE) = CAST(@dateTo as date))
	GROUP BY claim.Claim_type_ID,
			 claim.Response_organization_ID,
			 data.status_name;

	UPDATE data
		SET val = value.val
	FROM @DataFields_table data
	INNER JOIN @TypeOrgStatus_value value ON data.orgId = value.orgId
	AND data.typeId = @currentId
	AND data.orgId = value.orgId
	AND data.status_name = value.status_name;

	-- надійшло
	DELETE FROM @TypeOrgStatus_value;
	INSERT INTO @TypeOrgStatus_value
	SELECT 
	 @currentId,
	 claim.Response_organization_ID,
	 data.status_name,
	 COUNT(claim.Id) AS val
	FROM @DataFields_table data 
	INNER JOIN dbo.[Claims] claim ON data.[orgId] = claim.[Response_organization_ID]
	WHERE 
	claim.[Claim_type_ID] IN (SELECT Id FROM @stepTypes)
	AND data.status_name = ''надійшло'' 
	AND data.typeId = @currentId
	AND CAST(claim.Created_at as date) = @dateFinishOnly 	
	GROUP BY claim.Claim_type_ID,
			 claim.Response_organization_ID,
			 data.status_name;

	UPDATE data
		SET val = value.val
	FROM @DataFields_table data
	INNER JOIN @TypeOrgStatus_value value ON data.orgId = value.orgId
	AND data.typeId = @currentId
	AND data.orgId = value.orgId
	AND data.status_name = value.status_name;

	-- залишилось
	UPDATE data
		SET val = (z_p.val + z_n.val) - z_v.val
	FROM @DataFields_table data
	LEFT JOIN @DataFields_table z_v ON data.orgId = z_v.orgId
		AND data.typeId = z_v.typeId 
		AND z_v.status_name = ''виконано''
	LEFT JOIN @DataFields_table z_n ON data.orgId = z_n.orgId
		AND data.typeId = z_n.typeId 
		AND z_n.status_name = ''надійшло''
	LEFT JOIN @DataFields_table z_p ON data.orgId = z_p.orgId
		AND data.typeId = z_p.typeId 
		AND z_p.status_name = ''перехідні''
	WHERE data.typeId = @currentId
	  AND data.status_name = ''залишилось'';


	DELETE FROM @stepTypes;
	
	DELETE FROM @types_list 
	WHERE Id = @currentId;

	END
	
	IF (@vision <> ''full'') 
		OR @vision IS NULL
	BEGIN
		DECLARE @ForDelete TABLE (typeId INT, val INT);
		INSERT INTO @ForDelete 
		SELECT 
			typeId,
			SUM(val)
		FROM @DataFields_table
		GROUP BY typeId;
		
		DELETE FROM @DataFields_table
		WHERE typeId IN (SELECT 
							typeId
						 FROM @ForDelete
						 WHERE val = 0);
	END

	SELECT * 
FROM (
SELECT 
	orgId,
	short_name,
	status_name,
	sort,
	DataField,
	val
FROM @DataFields_table
) data_
PIVOT (
  SUM(val)
  FOR DataField
  IN (' + @cols + ')
) AS DATA_Pivot
  ORDER BY orgId,
			sort;


';

EXEC sp_executesql @query, N'@variant NVARCHAR(10), @vision NVARCHAR(10), @user_id NVARCHAR(128), @dateFrom DATETIME, @dateTo DATETIME, @orgId NVARCHAR(MAX)',
					  @variant = @variant,
					  @vision = @vision,
					  @user_id = @user_id, 
					  @dateFrom = @dateFrom,
					  @dateTo = @dateTo,
					  @orgId = @orgId
					   ;