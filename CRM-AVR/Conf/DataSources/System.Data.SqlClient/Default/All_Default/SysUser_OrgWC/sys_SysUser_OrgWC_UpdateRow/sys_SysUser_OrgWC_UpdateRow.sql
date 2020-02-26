update [dbo].[SysUser_OrgWC]
	set
		OrganizationWC_Id = @OrganizationWC_Id
		,SystemUser_Id	= @SystemUser_Id
	where Id= @Id