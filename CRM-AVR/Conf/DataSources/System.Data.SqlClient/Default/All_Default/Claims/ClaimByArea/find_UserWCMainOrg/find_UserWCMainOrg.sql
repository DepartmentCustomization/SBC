DECLARE @org INT = (select dbo.fu_Use_User_SystemOrg( @user) );

SELECT 
	  os.[Name] AS mainOrg
FROM CRM_AVR_System.dbo.[OrganisationStructure] os 
WHERE Id = @org ;