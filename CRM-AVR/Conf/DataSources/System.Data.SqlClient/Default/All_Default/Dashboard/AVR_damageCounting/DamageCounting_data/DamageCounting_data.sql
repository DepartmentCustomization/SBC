-- DECLARE @user_id NVARCHAR(128) = 'b1410b5c-ad83-4047-beb8-7aba16eb400c',
--  	   @variant NVARCHAR(10) = 'short';

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
WHERE [level] > 3;

UPDATE #Types_Tree 
SET [HasCHild] = IIF([level] = 3, 0, 1);
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
WHERE [level] > 3;

UPDATE #Types_Tree 
SET [HasCHild] = IIF([level] = 3, 0, 1);
END

DECLARE @DataField TABLE (Id INT, DataField NVARCHAR(MAX), val INT);
INSERT INTO @DataField
SELECT 
	Id,
	DataFiled,
	0
FROM #Types_Tree
WHERE HasChild = 0;

DECLARE @Organizations TABLE (Id INT, short_name NVARCHAR(500));
INSERT INTO @Organizations
SELECT 
	Id,
	Short_name
FROM dbo.[Organizations] 
WHERE 
Id IN (5502, 28)
;

DECLARE @Status TABLE (status_name NVARCHAR(100), sort TINYINT);
INSERT INTO @Status
SELECT ''перехідні'', 1
UNION
SELECT ''надійшло'', 2
UNION
SELECT ''виконано'', 3 
UNION
SELECT ''залишилось'', 4;

IF OBJECT_ID(''tempdb..#ResultSet'') IS NOT NULL
BEGIN
	DROP TABLE #ResultSet;
END
SELECT * 
INTO #ResultSet
FROM (
SELECT 
	org.Id orgId,
	org.short_name,
	stat.status_name,
	stat.sort,
	field.DataField,
	field.val
FROM @Organizations org 
CROSS JOIN @Status stat
LEFT JOIN @DataField field ON 1=1
) data_
PIVOT (
  SUM(val)
  FOR DataField
  IN (' + @cols + ')
) AS DATA_Pivot
  ORDER BY orgId,
			sort;


	--SELECT * FROM @DataField

	SELECT * 
	FROM #ResultSet;


';

EXEC sp_executesql @query, N'@variant NVARCHAR(10), @user_id NVARCHAR(128)',
					  @variant = @variant,
					  @user_id = @user_id 
					  ;