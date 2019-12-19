--declare @claim_id int = 2

if object_id('tempdb..#temp_OUT') is not null drop table #temp_OUT
create table #temp_OUT(
[history_id_old] int,
[history_id_new] int
)

insert into #temp_OUT ([history_id_new])
select t1.Id
  from [dbo].[claims_history] as t1
  where t1.claim_id = @claim_id
  order by t1.Id

update #temp_OUT set history_id_old = (select top 1 Id from [dbo].[claims_history] 
							   where [Load_date] < (select Load_date from [dbo].[claims_history] where Id = #temp_OUT.history_id_new) 
							   and [claim_id] = (select [claim_id] from [dbo].[claims_history] where Id = #temp_OUT.history_id_new)
							   order by [Load_date] desc)



SELECT [claims_history].[Id]
	  ,[claims_history].[Load_date]
      ,isnull(LastName, N'')+N' '+isnull([FirstName], N'')+N' '+isnull([Patronymic], N'') as [Log_User_FIO]
	  ,case when [claims_history].[Log_Activity] = N'INSERT' then N'Створення'
			when [claims_history].[Log_Activity] = N'UPDATE' then N'Редагування'
			else [claims_history].[Log_Activity] end as [Log_Activity]
  FROM [dbo].[claims_history]
  left join [#system_database_name#].[dbo].[User] on [User].UserId = [claims_history].[updated_by]
  where [claims_history].claim_id = @claim_id
 
 and #filter_columns#
 -- #sort_columns#
order by [claims_history].[Load_date] desc
offset @pageOffsetRows rows fetch next @pageLimitRows rows only

