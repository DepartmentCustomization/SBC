if exists (
SELECT 1
  FROM [CRM_AVR_System].[dbo].[UserInOrganisation]
  where [OrganisationStructureId] = 10
  and UserId = @UserId)
  begin
	 select top 1  [Organization_ID], 1 as isAdmin 
	 from [CRM_AVR_Analitics].[dbo].[Jobs] 
	 where [Login] = @UserId
	end
	else
	 begin
	 select top 1  [Organization_ID], 0 as isAdmin 
	 from [CRM_AVR_Analitics].[dbo].[Jobs] 
	 where [Login] = @UserId
	end
 
 
 
--  select top 1  [Organization_ID] 
--  from [CRM_AVR_Analitics].[dbo].[Jobs] 
--  where [Login] = @UserId