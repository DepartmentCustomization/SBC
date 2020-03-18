SELECT [SysUser_OrgWC].[Id]
	  ,Organizations.Name as OrganizationWC_name
     -- ,[SysUser_OrgWC].[OrganizationWC_Id]
	  ,concat( 
		case when [User].[FirstName] is null then null else [User].[FirstName]+ ' ' end,
		case when [User].[LastName] is null then null else [User].[LastName] end,
		case when [User].UserName is null then null else ' ('+[User].UserName+')' end
		) as SystemUser_name
      --,[SysUser_OrgWC].[SystemUser_Id]
  FROM [dbo].[SysUser_OrgWC]
	left join Organizations on Organizations.Id = SysUser_OrgWC.OrganizationWC_Id
	left join [CRM_AVR_System].[dbo].[User] on [User].UserId = SysUser_OrgWC.SystemUser_Id
  where 
  #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only