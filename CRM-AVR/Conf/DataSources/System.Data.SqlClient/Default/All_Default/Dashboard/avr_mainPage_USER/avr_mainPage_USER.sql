-- DECLARE @user NVARCHAR(128) = '4a79ce72-4a70-4bb7-aa06-5ff67662c500'  

/*
колонка  DB с признаком system возвращает в колонку parent 
vdp - Водопостачання
kan - Канализация
energy - Енергетика
vodokanal - ПАТ "АК"Київводоканал"
*/
    
    SELECT 
	MAX(org_str.Id) AS Id
	, org_str.Name
	, CASE 
	       WHEN dbo.fu_Use_User_SystemOrg(@user) = 11  THEN N'vdp'
           WHEN dbo.fu_Use_User_SystemOrg(@user) = 12  THEN N'kan'
           WHEN dbo.fu_Use_User_SystemOrg(@user) = 13  THEN N'energy'
           WHEN dbo.fu_Use_User_SystemOrg(@user) = 57  THEN N'vodokanal'
           WHEN dbo.fu_Use_User_SystemOrg(@user) = 1   THEN N'sys_admin'
           WHEN dbo.fu_Use_User_SystemOrg(@user) = 10  THEN N'vdk_admin'
        end as parent
	, N'system' AS DB
    FROM CRM_AVR_System.dbo.OrganisationStructure org_str
    WHERE id IN (SELECT TOP 1 OrganisationStructureId
    FROM CRM_AVR_System.dbo.UserInOrganisation
    WHERE UserId= @user and OrganisationStructureId <> 1)
	GROUP BY org_str.[Name] 

UNION ALL

    SELECT
        Organizations.Id
		, Organizations.Name
		--, Organizations.Parent_Organization_ID AS parent
		,Organizations.Name
		, 'analitics' AS DB
    FROM Contacts
        LEFT JOIN Jobs ON jobs.Id = Contacts.Job_ID
        LEFT JOIN Organizations ON Organizations.Id = Jobs.Organization_ID
    WHERE Job_ID =  
	(SELECT id
    FROM Jobs
    WHERE [Login] = @user)