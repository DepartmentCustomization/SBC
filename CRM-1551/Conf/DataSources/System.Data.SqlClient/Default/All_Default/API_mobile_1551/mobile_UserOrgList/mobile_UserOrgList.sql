-- DECLARE @userId NVARCHAR(128) = (SELECT UserId FROM CRM_1551_System.dbo.[User] WHERE UserName = 'y.laienko'); 

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


INSERT INTO #OrgsData
SELECT 
DISTINCT 
	organization_id,
	trim(short_name) AS shortName,
	3
FROM dbo.[OrganizationInResponsibilityRights] org_r
INNER JOIN dbo.Organizations o ON o.Id = org_r.organization_id
WHERE position_id IN (SELECT [Id] FROM @user_position)
AND o.Id NOT IN (SELECT [Id] FROM #OrgsData);
	
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