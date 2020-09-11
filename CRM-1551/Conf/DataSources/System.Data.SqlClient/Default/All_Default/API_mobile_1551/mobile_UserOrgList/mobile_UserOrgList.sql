--  DECLARE @userId NVARCHAR(128) = (SELECT UserId FROM CRM_1551_System.dbo.[User] WHERE UserName = 'y.laienko'); 

IF OBJECT_ID ('tempdb..#OrgsData') IS NOT NULL 
BEGIN
	DROP TABLE #OrgsData;
END

CREATE TABLE #OrgsData (Id INT, 
						shortName NVARCHAR(300), 
						sortIndex TINYINT)
						WITH (DATA_COMPRESSION = PAGE);


DECLARE @user_position TABLE (Id INT);
INSERT INTO @user_position
SELECT 
	[Id]
FROM dbo.Positions 
WHERE [programuser_id] = @userId;

INSERT INTO #OrgsData
SELECT 
	org.[Id],
	org.[short_name],
	1
FROM dbo.[OrganizationInResponsibility] org_resp 
INNER JOIN dbo.[Organizations] org ON org.Id = org_resp.organization_id
WHERE org_resp.position_id IN (SELECT [Id] FROM @user_position)
UNION
SELECT 
	org.[Id],
	org.[short_name],
	1
FROM dbo.[Positions] pos
INNER JOIN dbo.[Organizations] org ON org.Id = pos.organizations_id
WHERE pos.[Id] IN (SELECT [Id] FROM @user_position);

INSERT INTO #OrgsData
SELECT 
	org.[Id],
	org.[short_name],
	2
FROM dbo.[Positions] pos
INNER JOIN dbo.[Organizations] org ON org.Id = pos.organizations_id
INNER JOIN dbo.[PositionsHelpers] help ON help.main_position_id = pos.Id
WHERE help.helper_position_id IN (SELECT [Id] FROM @user_position)
AND org.[Id] NOT IN (SELECT [Id] FROM #OrgsData);

DECLARE @forRecList TABLE (Id INT);
INSERT INTO @forRecList 
SELECT 
	[Id] 
FROM #OrgsData;

DECLARE @CurrentOrgId INT;
WHILE (SELECT COUNT(1) FROM @forRecList) > 0
BEGIN
	SET @CurrentOrgId = (SELECT TOP 1 [Id] FROM @forRecList);
	WITH RecursiveOrg (Id, parentID, orgName) AS (
	    SELECT
	        Id,
	        parent_organization_id,
	        short_name
	    FROM
	        dbo.Organizations
	    WHERE
	        Id = @CurrentOrgId
	    UNION
	    ALL
	    SELECT
	        o.Id,
	        o.parent_organization_id,
	        o.short_name
	    FROM
	        dbo.Organizations o
	        JOIN RecursiveOrg r ON o.parent_organization_id = r.Id
	)

	INSERT INTO #OrgsData
	SELECT 
		[Id],
		[orgName],
		3
	FROM RecursiveOrg
	WHERE Id NOT IN (SELECT Id FROM #OrgsData);

	DELETE FROM @forRecList
	WHERE Id = @CurrentOrgId;

END
	
SELECT 
DISTINCT
	[Id],
	trim([shortName]) AS [shortName],
	[sortIndex]
FROM #OrgsData
WHERE #filter_columns#
ORDER BY [sortIndex],
		 trim([shortName])
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;