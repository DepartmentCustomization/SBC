INSERT INTO [dbo].[SysUser_OrgWC]
           ([OrganizationWC_Id]
           ,[SystemUser_Id])
           output [inserted].[Id]
     VALUES
           (@organizations_id
           ,@Login
		   )
		   
update Jobs
    set Login = @Login
    where Jobs.Id = @contact_id
   -- where Jobs.Contacts_ID = @contact_id

update [CRM_AVR_System].[dbo].[User]
set FirstName = (select Contacts.First_name from Contacts left join Jobs on Jobs.Contacts_ID = Contacts.Id where Jobs.Login = @Login)
	,LastName = (select Contacts.Surname from Contacts left join Jobs on Jobs.Contacts_ID = Contacts.Id where Jobs.Login = @Login)
where UserId = @Login

return