select [Statistic].Id, [Statistic].[date], [Statistic].[indicator_value], ISNULL([User].[LastName], N'')+ISNULL(N' '+[User].[FirstName], N'') user_name
  from [CRM_1551_Site_Integration].[dbo].[Statistic]
  left join [CRM_1551_System].[dbo].[User] on [Statistic].user_id=[User].UserId
  where diagram=7 and date between convert(date, @date_from) and convert(date, @date_to)