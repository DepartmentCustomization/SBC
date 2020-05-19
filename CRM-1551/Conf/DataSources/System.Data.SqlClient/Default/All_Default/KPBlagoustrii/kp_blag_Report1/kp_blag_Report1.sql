
  /*
  declare @districts nvarchar(max)=N'1,2,3,4,5,6,7,8,9,10,11';
  declare @date_from datetime='2020-05-01 12:10';
  declare @date_to datetime='2020-06-01 12:10';
  declare @user_id nvarchar(128)=N'8cbd0469-56f1-474b-8ea6-904d783a0941'
*/
  DECLARE @district_table TABLE (Id int);
  
  insert into @district_table (Id)

  select value*1 n
  from string_split((select @districts n), N',')
  --where value*1 IN --условие на человека
  --(select DISTINCT [Objects].district_id--[Territories].Id
  --from [dbo].[Positions]
  --inner join [dbo].[PersonExecutorChoose] on [PersonExecutorChoose].position_id=[Positions].id
  --inner join [dbo].[PersonExecutorChooseObjects] on [PersonExecutorChooseObjects].person_executor_choose_id=[PersonExecutorChoose].Id
  --inner join [dbo].[Territories] on [PersonExecutorChooseObjects].object_id=[Territories].object_id
  --inner join [dbo].[Objects] on [Territories].object_id=[Objects].Id
  --where [Positions].programuser_id=@user_id)

--select * from @district_table


  --DECLARE @sertor_table TABLE (Id int);

  ----INSERT INTO @sertor_table (Id)

  --select DISTINCT [Objects].district_id--[Territories].Id
  --from [dbo].[Positions]
  --inner join [dbo].[PersonExecutorChoose] on [PersonExecutorChoose].position_id=[Positions].id
  --inner join [dbo].[PersonExecutorChooseObjects] on [PersonExecutorChooseObjects].person_executor_choose_id=[PersonExecutorChoose].Id
  --inner join [dbo].[Territories] on [PersonExecutorChooseObjects].object_id=[Territories].object_id
  --inner join [dbo].[Objects] on [Territories].object_id=[Objects].Id
  --where [Positions].programuser_id=@user_id

  if OBJECT_ID('tempdb..#temp_que_state3') is not null drop table #temp_que_state3

  select [question_id], MAX([Log_Date]) [Log_Date]
  into #temp_que_state3
  from [dbo].[Question_History]
  where [question_state_id]=3
  group by [question_id]


  --перехід в стан "в роботі"
  if OBJECT_ID('tempdb..#temp_que_state2') is not null drop table #temp_que_state2

  select [question_id], MIN([Log_Date]) [Log_Date]
  into #temp_que_state2
  from [dbo].[Question_History]
  where [question_state_id]=2 --в роботі
  group by [question_id]

  --перехід в "не в компетенції"
  if OBJECT_ID('tempdb..#temp_ass_nevkom') is not null drop table #temp_ass_nevkom

  select [Assignment_History].assignment_id, min([Assignment_History].[Log_Date]) [Log_Date]
  into #temp_ass_nevkom
  from [dbo].[Territories]
  inner join [dbo].[Objects] on [Territories].object_id=[Objects].Id
  inner join @district_table d on [Objects].district_id=d.Id
  inner join [dbo].[QuestionsInTerritory] on [Territories].Id=[QuestionsInTerritory].territory_id
  inner join [dbo].[Questions] on [QuestionsInTerritory].question_id=[Questions].Id
  inner join [dbo].[Assignments] on [Questions].last_assignment_for_execution_id=[Assignments].Id
  inner join [dbo].[Assignment_History] on [Assignments].Id=[Assignment_History].assignment_id
  inner join [dbo].[AssignmentTypes] on [Assignments].assignment_type_id=[AssignmentTypes].Id
  inner join [dbo].[AssignmentStates] on [Assignments].assignment_state_id=[AssignmentStates].Id
  inner join [dbo].[AssignmentResults] on [Assignments].AssignmentResultsId=[AssignmentResults].Id
  inner join [dbo].[AssignmentResolutions] on [Assignments].AssignmentResolutionsId=[AssignmentResolutions].Id
  where --[Objects].district_id=9

   [AssignmentTypes].code <> N'ToAttention'
	AND [AssignmentStates].code <> N'Closed'
	AND [AssignmentResults].code = N'NotInTheCompetence'
	AND [AssignmentResolutions].name IN (N'Повернуто в 1551', N'Повернуто в батьківську організацію')
	--AND (CASE
	--	WHEN @role = N'Конролер' AND
	--		[AssignmentResolutions].name = N'Повернуто в 1551' THEN 1
	--	WHEN @role <> N'Конролер' AND
	--		[AssignmentResolutions].name = N'Повернуто в батьківську організацію' THEN 1
	--END) = 1
	group by [Assignment_History].assignment_id
  --колонка 11





  if OBJECT_ID('tempdb..#temp_count_que') is not null drop table #temp_count_que

  select territories_id, 
  SUM(count_registered) count_registered,
  SUM(count_in_work) count_in_work,
  SUM(count_on_inspection) count_on_inspection,
  SUM(count_closed_performed) count_closed_performed,
  SUM(count_closed_clear) count_closed_clear,
  SUM(count_for_completion) count_for_completion,
  SUM(count_built) count_built,
  SUM(count_not_processed_in_time) count_not_processed_in_time,
  SUM(count_close) count_close,
  SUM(DATEDIFF(day, registration_date, que_state2_log_date)) count_days_speed1, --11
  SUM(DATEDIFF(DAY, registration_date, ass_nevkom_log_date)) count_days_speed2 --11
  into #temp_count_que
  from
  (
  select [Territories].Id territories_id, --[Territories].name,
  case when [Questions].question_state_id=1 and [Questions].registration_date between @date_from and @date_to--зареєстровано
  then 1 else 0 end count_registered,
  case when [Questions].question_state_id=2 --в роботі
  then 1 else 0 end count_in_work,
  case when [Questions].question_state_id=3 --на перевірці
  then 1 else 0 end count_on_inspection,
  case when [Assignments].assignment_state_id=5 and [Assignments].AssignmentResultsId=4 --Закрито Виконано
  then 1 else 0 end count_closed_performed,
  case when [Assignments].assignment_state_id=5 and [Assignments].AssignmentResultsId=7 --Закрито роз*яснено
  then 1 else 0 end count_closed_clear,
  case when [Questions].question_state_id=4 --на доопрацювання
  then 1 else 0 end count_for_completion,
  case when [Questions].question_state_id in (1,2) and [Questions].control_date<getutcdate() --Простроено 
  then 1 else 0 end count_built,
  case when [Questions].question_state_id =3 and temp_que_state3.Log_Date<[Questions].control_date--Не вчасно опрацьовано 
  then 1 else 0 end count_not_processed_in_time,

  [Questions].registration_date,
  temp_que_state2.[Log_Date] que_state2_log_date,

  #temp_ass_nevkom.[Log_Date] ass_nevkom_log_date,

  case when [Questions].question_state_id=5 --закрито
  then 1 else 0 end count_close

  from 
  --[dbo].[Positions]
  --inner join [dbo].[PersonExecutorChoose] on [PersonExecutorChoose].position_id=[Positions].id
  --inner join [dbo].[PersonExecutorChooseObjects] on [PersonExecutorChooseObjects].person_executor_choose_id=[PersonExecutorChoose].Id
  --inner join 
  [dbo].[Territories] --on [PersonExecutorChooseObjects].object_id=[Territories].object_id
  inner join [dbo].[Objects] on [Territories].object_id=[Objects].Id
  inner join @district_table d on [Objects].district_id=d.Id
  inner join [dbo].[QuestionsInTerritory] on [Territories].Id=[QuestionsInTerritory].territory_id
  inner join [dbo].[Questions] ON [QuestionsInTerritory].question_id=[Questions].Id
  left join [dbo].[Assignments] on [Questions].last_assignment_for_execution_id=[Assignments].Id --можно оптимизировать, если в темповую загнать
  left join #temp_que_state3 temp_que_state3 on [Questions].Id=temp_que_state3.question_id
  left join #temp_que_state2 temp_que_state2 on [Questions].Id=temp_que_state2.question_id
  left join #temp_ass_nevkom on [Questions].last_assignment_for_execution_id=#temp_ass_nevkom.assignment_id
  ) t
  group by territories_id


  select s.Id, s.name territories_name,
  count_registered,
  count_in_work,
  count_on_inspection,
  count_closed_performed,
  count_closed_clear,
  count_for_completion,
  count_built,
  count_not_processed_in_time,

  case when count_registered=0 then null 
  else convert(numeric(8,2),convert(float, (count_days_speed1+count_days_speed2))/convert(float,count_registered)) end speed_of_employment, --11

  case when count_on_inspection+count_close+count_for_completion=0 then null
  else convert(numeric(8,2),(1.00-(convert(float,count_not_processed_in_time)/convert(float,(count_on_inspection+count_close+count_for_completion))))*100.00) end timely_processed, --12

  case when count_close+count_for_completion=0 then null 
  else convert(numeric(8,2),(1.00-(convert(float,count_closed_performed)/convert(float,(count_close+count_for_completion))))*100.00) end implementation, --13

  case when count_close+count_for_completion=0 then null
  else convert(numeric(8,2),(1.00-(convert(float,count_for_completion)/convert(float,(count_close+count_for_completion))))*100.00) end reliability --14
  from 
  (select [Territories].Id, [Territories].name+ISNULL(N' ('+[Positions].name+N')',N'') name
  from [dbo].[Territories]
  inner join [dbo].[Objects] on [Territories].object_id=[Objects].Id
  inner join @district_table d on [Objects].district_id=d.Id
  left join [dbo].[PersonExecutorChooseObjects] ON [PersonExecutorChooseObjects].object_id=[Territories].object_id
  left join [dbo].[PersonExecutorChoose] ON [PersonExecutorChooseObjects].person_executor_choose_id=[PersonExecutorChoose].Id
  left join [dbo].[Positions] ON [PersonExecutorChoose].position_id=[Positions].id) s
  left join #temp_count_que temp_count_que ON s.id=temp_count_que.territories_id

  --order by id