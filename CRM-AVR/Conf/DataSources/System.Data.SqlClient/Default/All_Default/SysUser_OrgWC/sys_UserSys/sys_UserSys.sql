SELECT [UserId] as Id
      ,concat( 
		case when [FirstName] is null then null else [FirstName]+ ' ' end,
		case when [LastName] is null then [LastName] else [LastName] end,
		case when [User].UserName is null then null else ' ('+[User].UserName+')' end
		) as user_name
		,UserId as SystemUser_Id
  FROM [CRM_AVR_System].[dbo].[User]
  where not exists (select * from Jobs where Jobs.Login = [CRM_AVR_System].[dbo].[User].UserId)
  and [CRM_AVR_System].[dbo].[User].UserId <> '29796543-b903-48a6-9399-4840f6eac396'
  and #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only