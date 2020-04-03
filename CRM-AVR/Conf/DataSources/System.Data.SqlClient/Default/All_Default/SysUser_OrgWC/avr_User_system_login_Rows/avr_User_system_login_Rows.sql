  select 
	SysUser_OrgWC.Id
	,Organizations.Name
	,Positions.Name as position_name
	,Contacts.Name as full_name
	--,Jobs.Login
	,sysUs.UserName
  from SysUser_OrgWC
	left join Jobs on Jobs.Login = SysUser_OrgWC.SystemUser_Id 
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join Positions on Positions.Id = Jobs.Position_ID
	left join Organizations on Organizations.Id = Jobs.Organization_ID
	left join [CRM_AVR_System].[dbo].[User] as sysUs on sysUs.UserId = SysUser_OrgWC.SystemUser_Id
where  #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only

/*
SELECT 
	Jobs.Id
	,Organizations.Name
	,Jobs.Job_name
	,Contacts.Surname
	,Contacts.First_name
	,Jobs.Login	
  FROM [dbo].Jobs
  left join Contacts on Contacts.Job_ID = Jobs.Id
  left join Organizations on Organizations.Id = Jobs.Organization_ID
  where Jobs.Login is not null
  --Parent_Organization_ID in (select Id from Organizations where Parent_Organization_ID = 7100)
  and 
  #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
	*/