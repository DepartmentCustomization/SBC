
/*
declare @date_from date='2020-03-02',
  @date_to date='2020-08-29';
  */

  if datediff(dd, @date_from, @date_to)<=30

  begin

		   select [Statistic].Id, [Statistic].[date], [Statistic].[indicator_value], ISNULL([User].[LastName], N'')+ISNULL(N' '+[User].[FirstName], N'') user_name
		   , ltrim([Statistic].[date]) name
		   from [CRM_1551_Site_Integration].[dbo].[Statistic]
		   left join [CRM_1551_System].[dbo].[User] on [Statistic].user_id=[User].UserId
		   where diagram=7 and date between convert(date, @date_from) and convert(date, @date_to)
  end

  if datediff(dd, @date_from, @date_to) between 31 and 90

  begin
			select --[Statistic].Id, 
			datepart(ww, [Statistic].[date]) Id,
			min([Statistic].[date]) date, 
			sum([Statistic].[indicator_value]) [indicator_value], 
			ISNULL([User].[LastName], N'')+ISNULL(N' '+[User].[FirstName], N'') user_name
		   , ltrim(min([Statistic].[date])) name
		   from [CRM_1551_Site_Integration].[dbo].[Statistic]
		   left join [CRM_1551_System].[dbo].[User] on [Statistic].user_id=[User].UserId
		   where diagram=7 and date between convert(date, @date_from) and convert(date, @date_to)
		   group by datepart(ww, [Statistic].[date]), ISNULL([User].[LastName], N'')+ISNULL(N' '+[User].[FirstName], N'')
		   order by datepart(ww, [Statistic].[date])
  end

  if datediff(dd, @date_from, @date_to) >90
	
	begin
		select --[Statistic].Id, 
			--datepart(ww, [Statistic].[date]) Id,
			(ltrim(datepart(yy, [Statistic].[date]))+ltrim(datepart(mm, [Statistic].[date])))*1 Id,
			min([Statistic].[date]) date, 

			sum(isnull([Statistic].[indicator_value],0)) [indicator_value], 

			ISNULL([User].[LastName], N'')+ISNULL(N' '+[User].[FirstName], N'') user_name
		   --, ltrim(min([Statistic].[date])) name

		   ,datename(mm,min([Statistic].[date]))+N' '+datename(yy,min([Statistic].[date])) name
		   from [CRM_1551_Site_Integration].[dbo].[Statistic]
		   left join [CRM_1551_System].[dbo].[User] on [Statistic].user_id=[User].UserId
		   where diagram=7 and date between convert(date, @date_from) and convert(date, @date_to)
		   --group by datepart(ww, [Statistic].[date]), ISNULL([User].[LastName], N'')+ISNULL(N' '+[User].[FirstName], N'')
		   group by datepart(yy, [Statistic].[date]), datepart(mm, [Statistic].[date]),
		   ISNULL([User].[LastName], N'')+ISNULL(N' '+[User].[FirstName], N'')
		   order by min([Statistic].[date])
	end




-- select [Statistic].Id, [Statistic].[date], [Statistic].[indicator_value], ISNULL([User].[LastName], N'')+ISNULL(N' '+[User].[FirstName], N'') user_name
--   from [CRM_1551_Site_Integration].[dbo].[Statistic]
--   left join [CRM_1551_System].[dbo].[User] on [Statistic].user_id=[User].UserId
--   where diagram=7 and date between convert(date, @date_from) and convert(date, @date_to)