UPDATE [dbo].[SysUser_OrgWC]
          SET  [OrganizationWC_Id] = @organizations_id
    where Id = @Id
		   
-- update Jobs
--     set Login = @Login
--     where Jobs.Id = @contact_id

update [CRM_AVR_System].[dbo].[User]
set FirstName = (select Contacts.First_name from Contacts left join Jobs on Jobs.Contacts_ID = Contacts.Id where Jobs.Login = @Login)
	, LastName = (select Contacts.Surname from Contacts left join Jobs on Jobs.Contacts_ID = Contacts.Id where Jobs.Login = @Login)
where UserId = @Login