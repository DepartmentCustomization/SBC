-- DECLARE @user_id NVARCHAR(128) = 'b1410b5c-ad83-4047-beb8-7aba16eb400c',
-- 		@typeAccessId INT = 1;

SELECT
DISTINCT
  org.[Id],
  org.Short_name
FROM
  [dbo].[Organizations] org
  INNER JOIN [dbo].[Organization_TypeAccess] org_access ON org.Id = org_access.Organization_Id
WHERE 
org.Id @GlodalFilter_UserOrganizations 
AND
org_access.TypeAccess_Id = 
IIF(@typeAccessId IS NOT NULL, @typeAccessId, org_access.TypeAccess_Id)
AND #filter_columns#
	  ORDER BY 1
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;