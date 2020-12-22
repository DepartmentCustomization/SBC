-- declare @date_from datetime='2020-10-06 16:21:26.830',
--   @date_to datetime=getutcdate()

  select 1 Id, convert(date, @date_from) date, N'Вася' PIB_operator, N'важное' subdivision, 
  100 count_open_claims, 100 count_close_claims, 200 count_all_claims,
  50 count_open_orders, 500 count_close_orders, 550 count_all_orders union all
  select 2 Id, convert(date, @date_from) date, N'Федя' PIB_operator, N'неважное' subdivision, 
  20 count_open_claims, 200 count_close_claims, 220 count_all_claims,
  50 count_open_orders, 100 count_close_orders, 150 count_all_orders union all
  select 3 Id, convert(date, @date_to) date, N'Степа' PIB_operator, N'важное' subdivision, 
  100 count_open_claims, 100 count_close_claims, 200 count_all_claims,
  50 count_open_orders, 100 count_close_orders, 150 count_all_orders union all
  select 4 Id, convert(date, @date_to) date, N'Петя' PIB_operator, N'неважное' subdivision, 
  1000 count_open_claims, 100 count_close_claims, 1100 count_all_claims,
  500 count_open_orders, 100 count_close_orders, 600 count_all_orders