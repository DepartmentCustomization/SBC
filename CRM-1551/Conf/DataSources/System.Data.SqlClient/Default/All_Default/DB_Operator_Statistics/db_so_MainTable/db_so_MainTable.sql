-- declare @date_from date='2019-01-01'
--   ,@date_to date='2020-12-12'
--   ,@organization_Id int=1761;

  --id_operator - вяжутся все таблички по нем

  IF OBJECT_ID('tempdb..#temp_call') IS NOT NULL DROP TABLE #temp_call;

  select [User].UserId user_id, ISNULL([User].[LastName]+N' ', N'')+ISNULL([User].[FirstName], N'') user_name, count([CallStatistic].Id) count_call,
  sum(case when [CallStatistic].[TalkTime]<10 then 1 else 0 end) count_10sec
  into #temp_call
  from [CallWay3].[dbo].[CallStatistic]
  inner join [CallWay3].[dbo].[CallOperator] on [CallStatistic].Id=[CallOperator].CallStatisticId
  inner join [CallWay3].[dbo].[OperatorCrm] on [CallOperator].OperatorId=[OperatorCrm].Id
  inner join [CRM_1551_System].[dbo].[User] on [OperatorCrm].Phone=[User].PhoneNumber
  left join [CRM_1551_Analitics].[dbo].[Positions] on [User].UserId=[Positions].programuser_id
  where convert(date, [CallStatistic].StartDate) between @date_from and @date_to
  or [Positions].organizations_id=isnull(@organization_id,0)
  group by [User].UserId, ISNULL([User].[LastName]+N' ', N'')+ISNULL([User].[FirstName], N'') 


  IF OBJECT_ID('tempdb..#temp_count_appeals') IS NOT NULL DROP TABLE #temp_count_appeals;

  select [Appeals].[user_id], count(distinct [Appeals].Id) count_appeals, count([Questions].Id) count_questions
  ,sum(case when [Consultations].consultation_type_id=3 then 1 else 0 end) consult3
  ,sum(case when [Consultations].consultation_type_id=2 then 1 else 0 end) consult2
  ,sum(case when [Consultations].consultation_type_id=1 then 1 else 0 end) consult1
  ,sum(case when [Consultations].consultation_type_id=4 then 1 else 0 end) consult4

  ,convert(numeric(6,0),avg(case when [Questions].Id is null then convert(float, datediff(second, [Appeals].start_date, [Appeals].end_date)) end)) avg_cons_sec
  ,sum(case when [Questions].Id is null and [Consultations].Id is null and datediff(second, [CallSipChannel].StartDate, [CallSipChannel].EndDate)>10 then 1 else 0 end) count_appeal_call -- нужно найти звонки
  --, null pro_appeal_call -- нужно найти звонки и в итоговой таблице найти процент
  into #temp_count_appeals
  from [CRM_1551_Analitics].[dbo].[Appeals]
  left join [CRM_1551_Analitics].[dbo].[Questions] on [Appeals].Id=[Questions].appeal_id
  left join [CRM_1551_Analitics].[dbo].[Consultations] on [Appeals].Id=[Consultations].appeal_id
  left join [CRM_1551_Analitics].[dbo].[Positions] on [Appeals].[user_id]=[Positions].programuser_id
  left join [CallWay3].[dbo].[CallSipChannel] on [Appeals].sipcallid=[CallSipChannel].SipCallId
  where ([receipt_source_id] in (1,8) and ISNULL([Appeals].sipcallid,0)<>0 and convert(date, [Appeals].[registration_date]) between @date_from and @date_to)
  or [Positions].organizations_id=isnull(@organization_id,0)
  group by [Appeals].[user_id]


  --select * from #temp_count_appeals

  select tc.user_id Id, user_name, tc.count_call, tc.count_10sec, 
  tca.count_appeals, tca.count_questions, tca.consult3, tca.consult2, tca.consult1, tca.consult4, 
  --tca.avg_cons_sec, 
  case when len(tca.avg_cons_sec/60)=1 then N'0'+ltrim(tca.avg_cons_sec/60) else ltrim(tca.avg_cons_sec/60) end+N':'+
  case when len(tca.avg_cons_sec-(tca.avg_cons_sec/60)*60)=1 then N'0'+ltrim(tca.avg_cons_sec-(tca.avg_cons_sec/60)*60) else ltrim(tca.avg_cons_sec-(tca.avg_cons_sec/60)*60) end avg_cons_sec,
  tca.count_appeal_call, 
  convert(numeric(6,2),convert(float, tca.count_appeal_call)/convert(float, tca.count_appeals)*100) pro_appeal_call
  from #temp_call tc
  inner join #temp_count_appeals tca on tc.user_id=tca.user_id