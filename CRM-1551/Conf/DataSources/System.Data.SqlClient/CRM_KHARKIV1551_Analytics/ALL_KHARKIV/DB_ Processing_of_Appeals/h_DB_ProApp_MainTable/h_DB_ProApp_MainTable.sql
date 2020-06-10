

  --параметры
  --declare @user_Id nvarchar(128)=N'Вася';

  IF object_id('tempdb..#temp_emergensy') IS NOT NULL DROP TABLE #temp_emergensy
  
  select [Id], [emergensy_name] name, 
  case when [emergensy_name]=N'Аварійна' then 1
  when [emergensy_name]=N'Термінова' then 2
  when [emergensy_name]=N'Звичайна' then 3 end sort
  into #temp_emergensy
  from [dbo].[Emergensy] 
  union
  select 0, N'Заходи', 0 sort

  --select * from #temp_emergensy


  IF object_id('tempdb..#temp_arrived') IS NOT NULL DROP TABLE #temp_arrived 

  select N'arrived' name, [QuestionTypes].emergency, count([Assignments].Id) count_id
  into #temp_arrived
  from [dbo].[Assignments]
  inner join [dbo].[Questions] on [Assignments].question_id=[Questions].Id
  inner join [dbo].[QuestionTypes] on [Questions].question_type_id=[QuestionTypes].Id
  where [Assignments].[assignment_state_id]=1 /*Зареєстровано*/
  group by [QuestionTypes].emergency

  IF object_id('tempdb..#temp_in_work') IS NOT NULL DROP TABLE #temp_in_work 

  select N'in_work' name, [QuestionTypes].emergency, count([Assignments].Id) count_id
  into #temp_in_work 
  from [dbo].[Assignments]
  inner join [dbo].[Questions] on [Assignments].question_id=[Questions].Id
  inner join [dbo].[QuestionTypes] on [Questions].question_type_id=[QuestionTypes].Id
  where [Assignments].[assignment_state_id]=2 /*В роботі*/
  group by [QuestionTypes].emergency
  union all
  select N'in_work' name, 0 emergency, count([Events].Id) count_id
  from [dbo].[Events]
  where [Events].active='true' and [start_date]<getutcdate() and [plan_end_date]>getutcdate()

  IF object_id('tempdb..#temp_attention') IS NOT NULL DROP TABLE #temp_attention

  select N'attention' name, [QuestionTypes].emergency, count([Assignments].Id) count_id
  into #temp_attention 
  from [dbo].[Assignments]
  inner join [dbo].[Questions] on [Assignments].question_id=[Questions].Id
  inner join [dbo].[QuestionTypes] on [Questions].question_type_id=[QuestionTypes].Id
  where getutcdate() between dateadd(HH, [QuestionTypes].Attention_term_hours, [Assignments].registration_date) and [Assignments].execution_date
  group by [QuestionTypes].emergency

  --overdue

  IF object_id('tempdb..#temp_overdue') IS NOT NULL DROP TABLE #temp_overdue

  select N'overdue' name, [QuestionTypes].emergency, count([Assignments].Id) count_id
  into #temp_overdue
  from [dbo].[Assignments]
  inner join [dbo].[Questions] on [Assignments].question_id=[Questions].Id
  inner join [dbo].[QuestionTypes] on [Questions].question_type_id=[QuestionTypes].Id
  where [Assignments].execution_date<getutcdate()
  group by [QuestionTypes].emergency
  union all
  select N'overdue' name, 0 emergency, count([Events].Id) count_id
  from [dbo].[Events]
  where [Events].active='true' and [plan_end_date]<getutcdate()


  IF object_id('tempdb..#temp_for_revision') IS NOT NULL DROP TABLE #temp_for_revision

  select N'for_revision' name, [QuestionTypes].emergency, count([Assignments].Id) count_id
  into #temp_for_revision
  from [dbo].[Assignments]
  inner join [dbo].[Questions] on [Assignments].question_id=[Questions].Id
  inner join [dbo].[QuestionTypes] on [Questions].question_type_id=[QuestionTypes].Id
  where [Assignments].[assignment_state_id]=1 /*Зареєстровано переделать на доопрацюванні*/
  group by [QuestionTypes].emergency


  IF object_id('tempdb..#temp_future') IS NOT NULL DROP TABLE #temp_future

  select N'future' name, [QuestionTypes].emergency, count([Assignments].Id) count_id
  into #temp_future
  from [dbo].[Assignments]
  inner join [dbo].[Questions] on [Assignments].question_id=[Questions].Id
  inner join [dbo].[QuestionTypes] on [Questions].question_type_id=[QuestionTypes].Id
  where [Assignments].registration_date>getutcdate()
  group by [QuestionTypes].emergency
  union all
  select N'future' name, 0 emergency, count([Events].Id) count_id
  from [dbo].[Events]
  where [Events].start_date>getutcdate()--active='true' and [plan_end_date]<getutcdate()


  IF object_id('tempdb..#temp_without_executor') IS NOT NULL DROP TABLE #temp_without_executor

  select N'without_executor' name, [QuestionTypes].emergency, count([Assignments].Id) count_id
  into #temp_without_executor
  from [dbo].[Assignments]
  inner join [dbo].[Questions] on [Assignments].question_id=[Questions].Id
  inner join [dbo].[QuestionTypes] on [Questions].question_type_id=[QuestionTypes].Id
  where [Assignments].executor_organization_id=1762
  group by [QuestionTypes].emergency




  select emergensy.Id, emergensy.name, 
  sum(arrived.count_id) arrived, 
  sum(in_work.count_id) in_work,
  sum(attention.count_id) attention,
  sum(overdue.count_id) overdue,
  sum(for_revision.count_id) for_revision,
  sum(future.count_id) future,
  sum(without_executor.count_id) without_executor
  from #temp_emergensy emergensy 
  left join #temp_arrived arrived on emergensy.Id=arrived.emergency
  left join #temp_in_work in_work on emergensy.Id=in_work.emergency
  left join #temp_attention attention on emergensy.Id=attention.emergency
  left join #temp_overdue overdue on emergensy.Id=overdue.emergency
  left join #temp_for_revision for_revision on emergensy.Id=for_revision.emergency
  left join #temp_future future on emergensy.Id=future.emergency
  left join #temp_without_executor without_executor on emergensy.Id=without_executor.emergency
  group by emergensy.Id, emergensy.name, emergensy.sort
  order by emergensy.sort

