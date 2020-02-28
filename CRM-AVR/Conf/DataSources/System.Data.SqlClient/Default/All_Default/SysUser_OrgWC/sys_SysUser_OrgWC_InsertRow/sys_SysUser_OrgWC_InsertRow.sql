 insert into [dbo].[SysUser_OrgWC]
	(
		OrganizationWC_Id
		,SystemUser_Id	
	)
output [inserted].[Id]
values
	(
		@OrganizationWC_Id
		,@SystemUser_Id	
	)