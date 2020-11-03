-- DECLARE @user_id NVARCHAR(128) = 'b1410b5c-ad83-4047-beb8-7aba16eb400c',
--   		@variant NVARCHAR(10) = 'short';

DECLARE @UserAccessKey TABLE (val INT);
INSERT INTO @UserAccessKey
SELECT 
	[Key]
FROM [#system_database_name#].[dbo].[OrganisationStructureRightsFilterKey] fk
INNER JOIN [#system_database_name#].[dbo].[OrganisationStructureRightsFilter] rf ON fk.RightsFilterId = rf.Id
	AND DataSourceQueryCode = 'GlobalFilter_ClaimTypes'
INNER JOIN [#system_database_name#].[dbo].[UserInOrganisation] os ON os.OrganisationStructureId = rf.OrganisationStructureId
	AND os.UserId = @user_id;
    -- [CRM_AVR_System] | [#system_database_name#]

IF OBJECT_ID ('tempdb..#Types_Tree') IS NOT NULL
BEGIN
	DROP TABLE #Types_Tree;
END

;
WITH ClaimTypes_Tree (Id, parentId, [Caption], DataFiled, HasChild, [level])
AS
(
    SELECT e.[Id], 
		   e.[Parent_сlaim_types_ID], 
		   e.[Name],
		   'type_' + CAST(e.Id AS NVARCHAR(10)),
		   IIF(EXISTS(SELECT Id FROM dbo.[Claim_Types] WHERE [Parent_сlaim_types_ID] = e.Id), 1, 0),
		   0 
    FROM dbo.[Claim_Types] e
	INNER JOIN @UserAccessKey access ON e.TypeAccess_ID = access.val
    WHERE e.Id = 1 
    UNION ALL
	SELECT
		   e.[Id], 
		   e.[Parent_сlaim_types_ID], 
		   e.[Name], 
		  'type_' + CAST(e.Id AS NVARCHAR(10)),
		   IIF(EXISTS(SELECT Id FROM dbo.[Claim_Types] WHERE [Parent_сlaim_types_ID] = e.Id), 1, 0),
		   r.level + 1 
    FROM dbo.[Claim_Types] e
	INNER JOIN @UserAccessKey access ON e.TypeAccess_ID = access.val
    INNER JOIN ClaimTypes_Tree r ON e.Parent_сlaim_types_ID = r.Id
)
SELECT 
	Id,
	parentId,
	Caption,
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

UPDATE #Types_Tree
	SET HasChild = 
	CASE WHEN c.Id IS NULL 
		 THEN 0 ELSE 1 END			  		
FROM #Types_Tree t
LEFT JOIN dbo.Claim_types c ON c.Parent_сlaim_types_ID = t.Id
WHERE [level] = 1;
END


SELECT 
	Id,
	parentId,
	Caption,
	DataFiled,
	HasChild,
	[level]
FROM #Types_Tree
ORDER BY [level], 
		 parentId;