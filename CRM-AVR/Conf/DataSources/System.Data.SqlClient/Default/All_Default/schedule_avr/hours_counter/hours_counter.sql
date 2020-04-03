/* 
    use CRM_AVR_Analitics
    declare 
    @DateStart date = '2019-02-01 00:00:00',
    @DateEnd date = '2019-02-28 00:00:00', 
	@JobId int = 12911;
*/

if object_id('tempdb..#temp_OUT') is not null drop table #temp_OUT
create table #temp_OUT(
day_val    int
)

declare @text_day nvarchar(max)
declare @start_day int = 1

WHILE @start_day <= DAY(@DateEnd)
BEGIN  
    set @text_day = isnull(@text_day,N'') + 'sum(isnull(P1.['+rtrim(@start_day)+'],0)) as ['+rtrim(@start_day)+'],'
    set @start_day = @start_day + 1
END  

set @text_day = left((SELECT isnull(@text_day,N'')),len((isnull(@text_day,N'')))-1)
declare   @querytosql nvarchar(max)

set @querytosql='
select  P1.JobId, P1.ContactId, P1.ContactName, P1.JobName, P1.MonthWorkTime, '+@text_day+'  
from  (
		select 1 as day_val		union all		select 2 as day_val		union all		select 3 as day_val		union all		select 4 as day_val		union all		select 5 as day_val		union all		select 6 as day_val		union all		select 7 as day_val		union all		select 8 as day_val		union all		select 9 as day_val		union all		select 10 as day_val		union all		select 11 as day_val		union all		select 12 as day_val		union all		select 13 as day_val		union all		select 14 as day_val		union all		select 15 as day_val		union all		select 16 as day_val		union all		select 17 as day_val		union all		select 18 as day_val		union all		select 19 as day_val		union all		select 20 as day_val		union all		select 21 as day_val		union all		select 22 as day_val		union all		select 23 as day_val		union all		select 24 as day_val		union all		select 25 as day_val		union all		select 26 as day_val		union all		select 27 as day_val		union all		select 28 as day_val		union all		select 29 as day_val		union all		select 30 as day_val		union all 		select 31 as day_val
	   ) as t0
 join (
	SELECT Jobs.Id as JobId, Day([Shifts].[Shift_date]) as MonthDay, 
	   Contacts.Id as ContactId
	  ,Contacts.Name as ContactName
	  ,Jobs.Job_name as JobName
	  
	 ,case when [Shifts].[Plan_end_time] < isnull([Shifts].[Fact_start_time], [Shifts].[Plan_start_time]) 
	  then datediff(hh,cast(CONVERT(varchar(10), [Shifts].[Shift_date], 112)+'' ''+CONVERT(varchar(8), 
	  isnull([Shifts].[Fact_start_time], [Shifts].[Plan_start_time]), 108) as datetime), 
	  cast(CONVERT(varchar(10), dateadd(day,1,[Shifts].[Shift_date]), 112)+'' ''+CONVERT(varchar(8),[Shifts].[Plan_end_time], 108) as datetime))
      else datediff(hh,cast(CONVERT(varchar(10), [Shifts].[Shift_date], 112)+'' ''+CONVERT(varchar(8), 
      isnull([Shifts].[Fact_start_time], [Shifts].[Plan_start_time]), 108) as datetime), 
      cast(CONVERT(varchar(10), dateadd(day,0,[Shifts].[Shift_date]), 112)+'' ''+CONVERT(varchar(8), [Shifts].[Plan_end_time], 108) as datetime))
	  end as DayWorkTime, 
	  MonthTime.MonthWorkTime   
  FROM [dbo].[Shifts]
	left join Teams on Teams.Id = Shifts.Team_ID
	left join Organizations on Organizations.Id = Teams.Organization_ID
	left join Mechanisms on Mechanisms.Id = Shifts.Mechanism_ID
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID

	inner join [dbo].[Shift_Jobs] on [Shift_Jobs].Shift_ID = [Shifts].Id
	left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
	left join Contacts on Contacts.Id = Jobs.Contacts_ID

	join (select Contacts.Id as ContactId, sum(case when [Shifts].[Plan_end_time] < isnull([Shifts].[Fact_start_time], [Shifts].[Plan_start_time]) 
		then datediff(hh,cast(CONVERT(varchar(10), [Shifts].[Shift_date], 112)+'' ''+CONVERT(varchar(8), 
	    isnull([Shifts].[Fact_start_time], [Shifts].[Plan_start_time]), 108) as datetime), 
		cast(CONVERT(varchar(10), dateadd(day,1,[Shifts].[Shift_date]), 112)+'' ''+CONVERT(varchar(8),[Shifts].[Plan_end_time], 108) as datetime))
	  else datediff(hh,cast(CONVERT(varchar(10), [Shifts].[Shift_date], 112)+'' ''+CONVERT(varchar(8), 
	  isnull([Shifts].[Fact_start_time], [Shifts].[Plan_start_time]), 108) as datetime), 
	  cast(CONVERT(varchar(10), dateadd(day,0,[Shifts].[Shift_date]), 112)+'' ''+CONVERT(varchar(8), [Shifts].[Plan_end_time], 108) as datetime))
	  end 
	  ) as MonthWorkTime FROM [dbo].[Shifts]
	left join Teams on Teams.Id = Shifts.Team_ID
	left join Organizations on Organizations.Id = Teams.Organization_ID
	left join Mechanisms on Mechanisms.Id = Shifts.Mechanism_ID
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID

	 join [dbo].[Shift_Jobs] on [Shift_Jobs].Shift_ID = [Shifts].Id
	 join Jobs on Jobs.Id = Shift_Jobs.Job_ID
	 join Contacts on Contacts.Id = Jobs.Contacts_ID  
	WHERE [Shifts].[Shift_date] between cast('''+CONVERT(varchar(10), dateadd(day,1,@DateStart), 112)+''' as date) and cast('''+CONVERT(varchar(10), dateadd(day,1,@DateEnd), 112)+''' as date)
	group by Contacts.Id) as MonthTime on Contacts.Id = MonthTime.ContactId
	WHERE Jobs.Id in ('+ltrim(@JobId)+') and [Shifts].[Shift_date] between cast('''+CONVERT(varchar(10), dateadd(day,1,@DateStart), 112)+''' as date) and cast('''+CONVERT(varchar(10), dateadd(day,1,@DateEnd), 112)+''' as date)
group by Jobs.Id, Shifts.Id, [Shift_date], [Shifts].[Plan_start_time], [Shifts].[Plan_end_time], 
[Shifts].[Fact_start_time], Contacts.Id, Contacts.Name, Jobs.Job_name, MonthTime.MonthWorkTime 
	) as t on t.MonthDay = t0.day_val
 PIVOT ( SUM(t.DayWorkTime)
    FOR t0.day_val IN ([1], [2], [3], [4], [5], [6], [7], [8],[9], [10],
	                          [11], [12], [13], [14], [15], [16], [17], [18], [19], [20], 
							  [21], [22], [23], [24], [25], [26], [27], [28], [29], [30], [31])) as P1    
				group by P1.JobId, P1.ContactId, P1.ContactName, P1.JobName, P1.MonthWorkTime		  
    UNION 
	select P1.JobId, P1.ContactId, P1.ContactName, P1.JobName, P1.MonthWorkTime, '+@text_day+'  
from  (
		select 1 as day_val		union all		select 2 as day_val		union all		select 3 as day_val		union all		select 4 as day_val		union all		select 5 as day_val		union all		select 6 as day_val		union all		select 7 as day_val		union all		select 8 as day_val		union all		select 9 as day_val		union all		select 10 as day_val		union all		select 11 as day_val		union all		select 12 as day_val		union all		select 13 as day_val		union all		select 14 as day_val		union all		select 15 as day_val		union all		select 16 as day_val		union all		select 17 as day_val		union all		select 18 as day_val		union all		select 19 as day_val		union all		select 20 as day_val		union all		select 21 as day_val		union all		select 22 as day_val		union all		select 23 as day_val		union all		select 24 as day_val		union all		select 25 as day_val		union all		select 26 as day_val		union all		select 27 as day_val		union all		select 28 as day_val		union all		select 29 as day_val		union all		select 30 as day_val		union all 		select 31 as day_val
	   ) as t0
 join (
	SELECT Jobs.Id as JobId, Day(Shifts_Person.Shift_date) as MonthDay, 
	   Contacts.Id as ContactId
	  ,Contacts.Name as ContactName
	  ,Jobs.Job_name as JobName
	  ,case when [Shifts_Person].[Plan_end_time] < [Shifts_Person].[Plan_start_time]
		then datediff(hh,cast(CONVERT(varchar(10), [Shifts_Person].[Shift_date], 112)+'' ''+CONVERT(varchar(8), 
	    [Shifts_Person].[Plan_start_time], 108) as datetime), 
		cast(CONVERT(varchar(10), dateadd(day,1,[Shifts_Person].[Shift_date]), 112)+'' ''+CONVERT(varchar(8),[Shifts_Person].[Plan_end_time], 108) as datetime))
	  else datediff(hh,cast(CONVERT(varchar(10), [Shifts_Person].[Shift_date], 112)+'' ''+CONVERT(varchar(8), 
	 [Shifts_Person].[Plan_start_time], 108) as datetime), 
	  cast(CONVERT(varchar(10), dateadd(day,0,[Shifts_Person].[Shift_date]), 112)+'' ''+CONVERT(varchar(8), [Shifts_Person].[Plan_end_time], 108) as datetime))
	  end as DayWorkTime, 
	  MonthTime.MonthWorkTime   
  FROM [dbo].[Shifts]
	left join Teams on Teams.Id = Shifts.Team_ID
	left join Organizations on Organizations.Id = Teams.Organization_ID
	left join Mechanisms on Mechanisms.Id = Shifts.Mechanism_ID
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
	inner join [dbo].[Shift_Jobs] on [Shift_Jobs].Shift_ID = [Shifts].Id
	left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
    left join Shifts_Person on Shifts_Person.Job_Id = Jobs.Id
	left join Contacts on Contacts.Id = Jobs.Contacts_ID

	join (select Contacts.Id as ContactId, sum(case when [Shifts_Person].[Plan_end_time] < [Shifts_Person].[Plan_start_time] 
		then datediff(hh,cast(CONVERT(varchar(10), [Shifts_Person].[Shift_date], 112)+'' ''+CONVERT(varchar(8), 
	    [Shifts_Person].[Plan_start_time], 108) as datetime), 
		cast(CONVERT(varchar(10), dateadd(day,1,[Shifts_Person].[Shift_date]), 112)+'' ''+CONVERT(varchar(8),[Shifts_Person].[Plan_end_time], 108) as datetime))
	  else datediff(hh,cast(CONVERT(varchar(10), [Shifts_Person].[Shift_date], 112)+'' ''+CONVERT(varchar(8), 
	  [Shifts_Person].[Plan_start_time], 108) as datetime), 
	  cast(CONVERT(varchar(10), dateadd(day,0,[Shifts_Person].[Shift_date]), 112)+'' ''+CONVERT(varchar(8), [Shifts_Person].[Plan_end_time], 108) as datetime))
	  end 
	  ) as MonthWorkTime FROM [dbo].[Shifts]
	left join Teams on Teams.Id = Shifts.Team_ID
	left join Organizations on Organizations.Id = Teams.Organization_ID
	left join Mechanisms on Mechanisms.Id = Shifts.Mechanism_ID
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
	join [dbo].[Shift_Jobs] on [Shift_Jobs].Shift_ID = [Shifts].Id
	 join Jobs on Jobs.Id = Shift_Jobs.Job_ID
	left join Shifts_Person on Shifts_Person.Job_Id = Jobs.Id
	 
	 join Contacts on Contacts.Id = Jobs.Contacts_ID  
	WHERE [Shifts_Person].[Shift_date] between cast('''+CONVERT(varchar(10), dateadd(day,1,@DateStart), 112)+''' as date) and cast('''+CONVERT(varchar(10), dateadd(day,1,@DateEnd), 112)+''' as date)
	group by Contacts.Id ) as MonthTime on Contacts.Id = MonthTime.ContactId
	WHERE Jobs.Id in ('+ltrim(@JobId)+')  and [Shifts_Person].[Shift_date] between cast('''+CONVERT(varchar(10), dateadd(day,1,@DateStart), 112)+''' as date) and cast('''+CONVERT(varchar(10), dateadd(day,1,@DateEnd), 112)+''' as date)
group by Jobs.Id, Shifts.Id, [Shifts_Person].[Shift_date], [Shifts_Person].[Plan_start_time], [Shifts_Person].[Plan_end_time], 
Contacts.Id, Contacts.Name, Jobs.Job_name, MonthTime.MonthWorkTime 
	) as t on t.MonthDay = t0.day_val
	
 PIVOT ( SUM(t.DayWorkTime)
    FOR t0.day_val IN ([1], [2], [3], [4], [5], [6], [7], [8],[9], [10],
	                          [11], [12], [13], [14], [15], [16], [17], [18], [19], [20], 
							  [21], [22], [23], [24], [25], [26], [27], [28], [29], [30], [31])) as P1    
  group by P1.JobId, P1.ContactId, P1.ContactName, P1.JobName, P1.MonthWorkTime
  order by ContactName
 '
--select @querytosql
exec sp_executesql @querytosql;