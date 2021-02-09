--DECLARE @user NVARCHAR(128) = '4a79ce72-4a70-4bb7-aa06-5ff67662c500';

SELECT *
   FROM [dbo].[Avr_home_page]
  
   EXCEPT 

   SELECT *
   FROM [dbo].[Avr_home_page]
   WHERE organization NOT IN (
   SELECT 
      CASE 
	       WHEN dbo.fu_Use_User_SystemOrg(@user) = 11  THEN N'vdp'
           WHEN dbo.fu_Use_User_SystemOrg(@user) = 12  THEN N'kan'
           WHEN dbo.fu_Use_User_SystemOrg(@user) = 13  THEN N'energy'
           WHEN dbo.fu_Use_User_SystemOrg(@user) = 57  THEN N'vodokanal'
           WHEN dbo.fu_Use_User_SystemOrg(@user) = 1   THEN N'sys_admin'
           WHEN dbo.fu_Use_User_SystemOrg(@user) = 10  THEN N'vdk_admin'
      END
		 AS parent
   FROM CRM_AVR_System.dbo.OrganisationStructure org_str
   WHERE id IN (SELECT TOP 1 OrganisationStructureId
   FROM CRM_AVR_System.dbo.UserInOrganisation
   WHERE UserId= @user)
   )
   ORDER BY [weight] DESC
   --test