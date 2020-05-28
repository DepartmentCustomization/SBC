/*
declare @sector_id int =2;
  declare @user_id nvarchar(128)=N'8cbd0469-56f1-474b-8ea6-904d783a0941';
  declare @date_from datetime='2020-04-01 12:10';
  declare @date_to datetime='2020-06-01 12:10';
  */

  if OBJECT_ID('tempdb..#temp_que_state3') is not null drop table #temp_que_state3

  select [question_id], MAX([Log_Date]) [Log_Date]
  into #temp_que_state3
  from [dbo].[Question_History]
  where [question_state_id]=3
  and [registration_date] between @date_from and @date_to
  group by [question_id]


  --перехід в стан "в роботі" по ходу - не нужно
  if OBJECT_ID('tempdb..#temp_que_state2') is not null drop table #temp_que_state2

  select [question_id], MIN([Log_Date]) [Log_Date]
  into #temp_que_state2
  from [dbo].[Question_History]
  where [question_state_id]=2 --в роботі
  and [registration_date] between @date_from and @date_to
  group by [question_id]


--в "не в компетенції"
if OBJECT_ID('tempdb..#temp_ass_nevkom') is not null drop table #temp_ass_nevkom

select [assignment_id], min([Log_Date]) [Log_Date]
into #temp_ass_nevkom
  from [dbo].[Assignment_History]
  where [registration_date] between @date_from and @date_to
  and [assignment_state_id]=3 and /*На перевірці*/ [AssignmentResultsId]=3 /*Не в компетенції*/
  group by [assignment_id]



  if OBJECT_ID('tempdb..#temp_count_que') is not null drop table #temp_count_que

  select [executor_organization_id], --1
  SUM(count_all) count_all, --2
  SUM(count_registered) count_registered, --3
  SUM(count_in_work) count_in_work, --4
  SUM(count_on_inspection) count_on_inspection,
  SUM(count_closed_performed) count_closed_performed,
  SUM(count_closed_clear) count_closed_clear,
  SUM(count_for_completion) count_for_completion,
  SUM(count_built) count_built,
  SUM(count_not_processed_in_time) count_not_processed_in_time,
  --SUM(count_close) count_close,
  --SUM(DATEDIFF(day, registration_date, que_state2_log_date)) count_days_speed1, --11
  --SUM(DATEDIFF(DAY, registration_date, ass_nevkom_log_date)) count_days_speed2 --11
  AVG(count_days_speed) count_days_speed
  into #temp_count_que
  from
  (
  select [Assignments_ok].[executor_organization_id], --[Territories].name,
  1 count_all,
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

  case 
		when temp_que_state2.[Log_Date] is not null and temp_ass_nevkom.[Log_Date] is null then DATEDIFF(mi, [Questions].registration_date, temp_que_state2.[Log_Date])
		when temp_que_state2.[Log_Date] is null and temp_ass_nevkom.[Log_Date] is not null then DATEDIFF(mi, [Questions].registration_date, temp_ass_nevkom.[Log_Date])
		when temp_que_state2.[Log_Date] is not null and temp_ass_nevkom.[Log_Date] is not null and temp_que_state2.[Log_Date]>=temp_ass_nevkom.[Log_Date]
			then DATEDIFF(mi, [Questions].registration_date, temp_que_state2.[Log_Date])
				else DATEDIFF(mi, [Questions].registration_date, temp_ass_nevkom.[Log_Date]) end count_days_speed

  --case when [Questions].question_state_id=5 --закрито
  --then 1 else 0 end count_close

  from 
  --[dbo].[Positions]
  --inner join [dbo].[PersonExecutorChoose] on [PersonExecutorChoose].position_id=[Positions].id
  --inner join [dbo].[PersonExecutorChooseObjects] on [PersonExecutorChooseObjects].person_executor_choose_id=[PersonExecutorChoose].Id
  --inner join 
  [dbo].[Territories] --on [PersonExecutorChooseObjects].object_id=[Territories].object_id
  --inner join [dbo].[Objects] on [Territories].object_id=[Objects].Id
  --inner join @district_table d on [Objects].district_id=d.Id
  inner join [dbo].[QuestionsInTerritory] on [Territories].Id=[QuestionsInTerritory].territory_id
  inner join [dbo].[Questions] ON [QuestionsInTerritory].question_id=[Questions].Id
  inner join [Assignments] [Assignments_ok] on [Assignments_ok].question_id=[Questions].Id
  left join [dbo].[Assignments] on [Assignments].Id=[Questions].last_assignment_for_execution_id--[Questions].Id=[Assignments].question_id and [Assignments].main_executor='true'
  --left join #temp_ass_nevkom temp_ass_nevkom on 
  left join #temp_que_state3 temp_que_state3 on [Questions].Id=temp_que_state3.question_id
  left join #temp_que_state2 temp_que_state2 on [Questions].Id=temp_que_state2.question_id
  left join #temp_ass_nevkom temp_ass_nevkom on [Assignments].Id=temp_ass_nevkom.assignment_id
  where [Territories].Id=@sector_id and [Questions].[registration_date] between @date_from and @date_to
  ) t
  group by [executor_organization_id]

  --тут стоп

  select temp_count_que.executor_organization_id Id, [Organizations].short_name exec_name,
  count_all,
  count_registered,
  count_in_work,
  count_on_inspection,
  count_closed_performed,
  count_closed_clear,
  count_for_completion,
  count_built,
  count_not_processed_in_time,

  --count_days_speed1, count_days_speed2,

  --case when count_registered=0 then null 
  --else convert(numeric(8,2),convert(float, (case 
  ----when count_days_speed1 is not null and count_days_speed2 is not null then count_days_speed1+count_days_speed2

  --when count_days_speed1 is null then count_days_speed2 --count_days_speed1+count_days_speed2
  --when count_days_speed2 is null then count_days_speed1 end

  --))/convert(float,count_registered)) end speed_of_employment, --11
  convert(numeric(8,2),count_days_speed/3600.00) speed_of_employment,

  case when count_on_inspection+count_closed_performed+count_closed_clear+count_for_completion=0 then null
  else convert(numeric(8,2),(1.00-(convert(float,count_not_processed_in_time)/convert(float,(count_on_inspection+count_closed_performed+count_closed_clear+count_for_completion))))*100.00) end timely_processed, --12

  case when count_closed_performed+count_closed_clear+count_for_completion=0 then null 
  else convert(numeric(8,2),(1.00-(convert(float,count_closed_performed)/convert(float,(count_closed_performed+count_closed_clear+count_for_completion))))*100.00) end implementation, --13

  case when count_closed_performed+count_closed_clear+count_for_completion=0 then null
  else convert(numeric(8,2),(1.00-(convert(float,count_for_completion)/convert(float,(count_closed_performed+count_closed_clear+count_for_completion))))*100.00) end reliability --14
  from 
  #temp_count_que temp_count_que
  left join [dbo].[Organizations] on temp_count_que.executor_organization_id=[Organizations].Id
  where
  #filter_columns#
  ----#sort_columns#
  order by 1
  --offset @pageOffsetRows rows fetch next @pageLimitRows rows only

  --order by id