
/*
declare @date_from date='2020-07-01'
   ,@date_to date='2020-07-01'
   ,@organizations_Id nvarchar(200)--=N'1761, 1760';
*/
declare @date_from_t nvarchar(max)=convert(date,convert(date, @date_from))
declare @date_to_t nvarchar(max)=convert(date,convert(date, @date_to))

IF OBJECT_ID('tempdb..#temp_CallStatistic') IS NOT NULL DROP TABLE #temp_CallStatistic;

create table #temp_CallStatistic (Id int, [TalkTime] int, OperatorCrm_Phone nvarchar(50) COLLATE Ukrainian_CI_AS)

declare @oqcall_s nvarchar(max)=N'select * from openquery([10.192.200.16], '''+N'
select [CallStatistic].Id CallStatistic_Id, [CallStatistic].[TalkTime] CallStatistic_TalkTime, [OperatorCrm].Phone COLLATE Ukrainian_CI_AS
from [CallStatistic] 
inner join [CallOperator] on [CallStatistic].Id=[CallOperator].CallStatisticId
inner join [OperatorCrm] on [CallOperator].OperatorId=[OperatorCrm].Id
where convert(date, [CallStatistic].StartDate) between '''''+@date_from_t+N''''' and '''''+@date_to_t+N''''''')'

--select @oqcall_s

insert into #temp_CallStatistic (Id, [TalkTime], OperatorCrm_Phone)
exec (@oqcall_s)

--select * from #temp_CallStatistic
--stop #temp_CallStatistic

IF OBJECT_ID('tempdb..#temp_CallSipChannel') IS NOT NULL DROP TABLE #temp_CallSipChannel;

create table #temp_CallSipChannel (SipCallId nvarchar(100) COLLATE Ukrainian_CI_AS
--, [StartDate] datetime, [EndDate] datetime, CallStatisticId int
, TalkTime int
)

declare @oqcall_csc nvarchar(max)=N'select * from openquery([10.192.200.16], '''+N'select [CallSipChannel].SipCallId COLLATE Ukrainian_CI_AS SipCallId,
[CallStatistic].[TalkTime]
from [CallSipChannel]
inner join [CallStatistic] on [CallSipChannel].CallStatisticId=[CallStatistic].Id
where convert(date, [CallStatistic].StartDate) between '''''+@date_from_t+N''''' and '''''+@date_to_t+N'''''
'')'

--select @oqcall_csc

insert into #temp_CallSipChannel (SipCallId, TalkTime)
exec (@oqcall_csc)


 
   
   IF OBJECT_ID('tempdb..#temp_positions_table') IS NOT NULL DROP TABLE #temp_positions_table;

   create table #temp_positions_table (Id int, organizations_id int, programuser_id nvarchar(128) COLLATE Ukrainian_CI_AS)


   IF OBJECT_ID('tempdb..#temp_organizations_table') IS NOT NULL DROP TABLE #temp_organizations_table;

   IF @organizations_Id IS NULL
   BEGIN
    insert into #temp_positions_table (Id, [organizations_id], programuser_id )
	select Id, [organizations_id], programuser_id COLLATE Ukrainian_CI_AS
	from [CRM_1551_Analitics].[dbo].[Positions]
   END

   ELSE
   BEGIN
	select value Id
	into #temp_organizations_table
	from string_split((select replace(@organizations_Id, N' ', N'')), N',')

	insert into #temp_positions_table (Id, [organizations_id], programuser_id)
	select [Positions].Id, [Positions].[organizations_id], [Positions].[programuser_id]
	from [CRM_1551_Analitics].[dbo].[Positions]
	inner join #temp_organizations_table on [Positions].organizations_id=#temp_organizations_table.Id
   END

    
  --id_operator - вяжутся все таблички по нем
  
  IF OBJECT_ID('tempdb..#temp_call') IS NOT NULL DROP TABLE #temp_call;

  select [User].UserId user_id, ISNULL([User].[LastName]+N' ', N'')+ISNULL([User].[FirstName], N'') user_name, 
  count([CallStatistic].Id) count_call,
  sum(case when [CallStatistic].[TalkTime]<10 then 1 else 0 end) count_10sec
  into #temp_call
  from #temp_CallStatistic [CallStatistic]
  --inner join [CallWay3].[dbo].[CallOperator] on [CallStatistic].Id=[CallOperator].CallStatisticId
  --inner join [CallWay3].[dbo].[OperatorCrm] on [CallOperator].OperatorId=[OperatorCrm].Id
  inner join [#system_database_name#].[dbo].[User] on [CallStatistic].OperatorCrm_Phone=[User].PhoneNumber
  inner join #temp_positions_table [Positions] on [User].UserId=[Positions].programuser_id
  --where convert(date, [CallStatistic].StartDate) between @date_from and @date_to
  --or [Positions].organizations_id=isnull(@organization_id,0)
  group by [User].UserId, ISNULL([User].[LastName]+N' ', N'')+ISNULL([User].[FirstName], N'') 

  
  IF OBJECT_ID('tempdb..#temp_count_appeals') IS NOT NULL DROP TABLE #temp_count_appeals;

  select [Appeals].[user_id], count(distinct [Appeals].Id) count_appeals, count([Questions].Id) count_questions
  ,sum(case when [Consultations].consultation_type_id=3 then 1 else 0 end) consult3
  ,sum(case when [Consultations].consultation_type_id=2 then 1 else 0 end) consult2
  ,sum(case when [Consultations].consultation_type_id=1 then 1 else 0 end) consult1
  ,sum(case when [Consultations].consultation_type_id=4 then 1 else 0 end) consult4

  --,convert(numeric(6,0),avg(case when [Questions].Id is null then convert(float, datediff(second, [Appeals].start_date, [Appeals].end_date)) end)) avg_cons_sec
  --[CallSipChannel]
  ,convert(int,avg(case when [Questions].Id is null then convert(float, [CallSipChannel].TalkTime) end)) avg_cons_sec
  --,sum(case when [Questions].Id is null and [Consultations].Id is null and datediff(second, [CallSipChannel].StartDate, [CallSipChannel].EndDate)>10 then 1 else 0 end) count_appeal_call -- нужно найти звонки
  ,sum(case when [Questions].Id is null and [Consultations].Id is null and [CallSipChannel].SipCallId is not null and [CallSipChannel].TalkTime>10 then 1 else 0 end) count_appeal_call -- нужно найти звонки
  --, null pro_appeal_call -- нужно найти звонки и в итоговой таблице найти процент
  into #temp_count_appeals
  from [CRM_1551_Analitics].[dbo].[Appeals]
  inner join #temp_positions_table [Positions] on [Appeals].[user_id]=[Positions].programuser_id
  left join [CRM_1551_Analitics].[dbo].[Questions] on [Appeals].Id=[Questions].appeal_id
  left join [CRM_1551_Analitics].[dbo].[Consultations] on [Appeals].Id=[Consultations].appeal_id
  left join #temp_CallSipChannel [CallSipChannel] on [Appeals].sipcallid=[CallSipChannel].SipCallId
  where ([receipt_source_id] in (1,8) and ISNULL([Appeals].sipcallid,N'0') NOT IN (N'0', N'{sipCallId}') and convert(date, [Appeals].[registration_date]) between @date_from and @date_to)
  --or [Positions].organizations_id=isnull(@organization_id,0)
  group by [Appeals].[user_id]


  ----select * from #temp_count_appeals
  /*тут*/
  select tc.user_id Id, user_name, tc.count_call, tc.count_10sec, 
  tca.count_appeals, tca.count_questions, tca.consult3, tca.consult2, tca.consult1, tca.consult4, 
  --tca.avg_cons_sec, 
  case when len(tca.avg_cons_sec/60)=1 then N'0'+ltrim(tca.avg_cons_sec/60) else ltrim(tca.avg_cons_sec/60) end+N':'+
  case when len(tca.avg_cons_sec-(tca.avg_cons_sec/60)*60)=1 then N'0'+ltrim(tca.avg_cons_sec-(tca.avg_cons_sec/60)*60) else ltrim(tca.avg_cons_sec-(tca.avg_cons_sec/60)*60) end avg_cons_sec,
  tca.count_appeal_call, 
  convert(numeric(6,2),convert(float, tca.count_appeal_call)/convert(float, tca.count_appeals)*100) pro_appeal_call
  from #temp_call tc
  inner join #temp_count_appeals tca on tc.user_id=tca.user_id


  --select * from #temp_count_appeals
