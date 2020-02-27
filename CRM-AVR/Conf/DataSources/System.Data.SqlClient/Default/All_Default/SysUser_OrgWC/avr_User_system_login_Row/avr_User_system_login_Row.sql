  select 
	SysUser_OrgWC.Id
	,Organizations.Name as organizations_name
	    ,Organizations.Id as organizations_id
	,Positions.Name as Job_name
	,Contacts.Name as contact_name
		,Contacts.Id as contact_id
	,sysUs.UserName as Login
	,sysUs.UserName as Login2
	,SysUser_OrgWC.[SystemUser_Id]
  from SysUser_OrgWC
	left join Jobs on Jobs.Login = SysUser_OrgWC.SystemUser_Id 
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join Positions on Positions.Id = Jobs.Position_ID
	left join Organizations on Organizations.Id = Jobs.Organization_ID
	left join [CRM_AVR_System].[dbo].[User] as sysUs on sysUs.UserId = SysUser_OrgWC.SystemUser_Id
where SysUser_OrgWC.Id = @Id



/*SELECT 
	Jobs.Id
	,Organizations.Name as organizations_name
	    ,Organizations.Id as organizations_id
	,Jobs.Job_name
	,Contacts.Name as contact_name
	,Contacts.Id as contact_id
	,Jobs.Login	
  FROM [dbo].Jobs
  left join Contacts on Contacts.Job_ID = Jobs.Id
  left join Organizations on Organizations.Id = Jobs.Organization_ID
  where Jobs.Id = @Id
  */