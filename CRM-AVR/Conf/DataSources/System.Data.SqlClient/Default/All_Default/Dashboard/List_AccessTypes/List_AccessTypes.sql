-- DECLARE @user_id NVARCHAR(128) = 'b1410b5c-ad83-4047-beb8-7aba16eb400c';

SELECT
	access.Id,
	access.[Name]
FROM CRM_AVR_System.[dbo].[OrganisationStructureRightsFilterKey] fk
INNER JOIN CRM_AVR_System.[dbo].[OrganisationStructureRightsFilter] rf ON fk.RightsFilterId = rf.Id
	AND DataSourceQueryCode = 'GlobalFilter_ClaimTypes'
INNER JOIN CRM_AVR_System.[dbo].[UserInOrganisation] os ON os.OrganisationStructureId = rf.OrganisationStructureId
	AND os.UserId = @user_id
INNER JOIN dbo.[TypeAccess] access ON access.Id = [Key]
WHERE [Key] <> '103'
ORDER BY 1
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;