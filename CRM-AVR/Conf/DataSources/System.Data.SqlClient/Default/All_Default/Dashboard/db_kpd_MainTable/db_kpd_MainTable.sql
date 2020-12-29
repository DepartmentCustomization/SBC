


/*
declare @dateFrom datetime='2020-10-09 08:34:32.563',
	@dateTo datetime='2020-10-10 08:34:32.563';
*/
  if object_id('tempdb..#temp_claims_open') is not NULL drop table #temp_claims_open

  select [User], convert(date, [Created_at]) [date], count(Id) count_claims_open
  into #temp_claims_open
  from [dbo].[Claims]
  where [Created_at] between @dateFrom and @dateTo
  group by [User], convert(date, [Created_at])

  if object_id('tempdb..#temp_claims_close') is not NULL drop table #temp_claims_close

  select [User], convert(date, [Fact_finish_at]) [date], count(Id) count_claims_close
  into #temp_claims_close
  from [dbo].[Claims]
  where [Fact_finish_at] between @dateFrom and @dateTo
  group by [User], convert(date, [Fact_finish_at])

  if object_id('tempdb..#temp_orders_open') is not NULL drop table #temp_orders_open

  select [User_id] [User], convert(date,[Created_at]) [date], count(Id) count_orders_open
  into #temp_orders_open
  from [dbo].[Orders]
  where [Created_at] between @dateFrom and @dateTo
  group by [User_id], convert(date,[Created_at])

  if object_id('tempdb..#temp_orders_close') is not NULL drop table #temp_orders_close

  select [User_id] [User], convert(date,[Closed_at]) [date], count(Id) count_orders_close
  into #temp_orders_close
  from [dbo].[Orders]
  where [Closed_at] between @dateFrom and @dateTo
  group by [User_id], convert(date,[Closed_at])


  if object_id('tempdb..#temp_main') is not NULL drop table #temp_main
  --create table #temp_main ([User] nvarchar(128), [date] date)

  select [User], [date]
  into #temp_main
  from
  (
  select [User], date
  from #temp_claims_open
	union
  select [User], date
  from #temp_claims_close
	union
  select [User], date
  from #temp_orders_open
	union
  select [User], date
  from #temp_orders_close
  ) t



  --select * from #temp_orders_open

  select ROW_NUMBER() over(order by [date], subdivision) Id,
  [date], PIB_operator, subdivision, count_open_claims, count_close_claims, count_all_claims,
  count_open_orders, count_close_orders, count_all_orders
  from
  (
  select distinct
  --ROW_NUMBER() over(order by tm.date, o.Short_name) Id ,
  tm.date, isnull(u.LastName+N' ', N'')+isnull(u.FirstName,N'') PIB_operator, o.Short_name subdivision, 
  isnull(tco.count_claims_open,0) count_open_claims, 
  isnull(tcc.count_claims_close,0) count_close_claims, 
  isnull(tco.count_claims_open,0)+isnull(tcc.count_claims_close,0) count_all_claims,

  isnull(too.count_orders_open,0) count_open_orders,
  isnull(toc.count_orders_close,0) count_close_orders,
  isnull(too.count_orders_open,0)+isnull(toc.count_orders_close,0) count_all_orders

  from #temp_main tm
  left join [dbo].[SysUser_OrgWC] so on tm.[User]=so.SystemUser_Id
  left join [dbo].[Organizations] o on so.OrganizationWC_Id=o.Id
  left join [CRM_AVR_System].[dbo].[User] u on tm.[User]=u.UserId
  left join #temp_claims_open tco on tm.[User]=tco.[User] and tm.date=tco.date
  left join #temp_claims_close tcc on tm.[User]=tcc.[User] and tm.date=tcc.date
  left join #temp_orders_open too on tm.[User]=too.[User] and tm.date=too.date
  left join #temp_orders_close toc on tm.[User]=toc.[User] and tm.date=toc.date
  ) t
  -- where 
  -- #filter_columns#
  -- #sort_columns#
  --offset @pageOffsetRows rows fetch next @pageLimitRows rows only
