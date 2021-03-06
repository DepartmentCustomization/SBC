--   declare @org int = 2003;
--   declare @dateFrom date = '2019-01-01';
--   declare @dateTo date = getdate();
--   declare @question_type_id int = 1;

declare @question_type_t table (Id int)

if @question_type_id = 1
begin  
 insert into @question_type_t (Id)
 SELECT [Id] from [QuestionTypes] with (nolock)
 end
 else 
 begin 
 insert into @question_type_t (Id) 
select @question_type_id
end;

--select * from @question_type_t

if object_id('tempdb..#temp_Organizations1') is not null drop table #temp_Organizations1
begin
create table #temp_Organizations1 (main_org_id int, main_org_parent_organization_id int, main_org_name nvarchar(500), L1_id int, L1_org_name nvarchar(500)
  , L2_id int, L2_org_name nvarchar(500), L3_id int, L3_org_name nvarchar(500), L4_id int, L4_org_name nvarchar(500), L5_id int, L5_org_name nvarchar(500))
end

  insert into #temp_Organizations1 (main_org_id, main_org_parent_organization_id, main_org_name, L1_id, L1_org_name
  , L2_id, L2_org_name, L3_id, L3_org_name, L4_id, L4_org_name, L5_id, L5_org_name)
  SELECT main_org.id as main_org_id, main_org.parent_organization_id as main_org_parent_organization_id, main_org.short_name as main_org_name
  ,L1.id as L1_id, L1.short_name as L1_org_name
  ,L2.id as L2_id, L2.short_name as L2_org_name
  ,L3.id as L3_id, L3.short_name as L3_org_name
  ,L4.id as L4_id, L4.short_name as L4_org_name
  ,L5.id as L5_id, L5.short_name as L5_org_name
  FROM 
  (SELECT *
  FROM  [dbo].[Organizations] with (nolock)
  WHERE [parent_organization_id] = @org) main_org

  LEFT JOIN 
  
  (SELECT *
  FROM  [dbo].[Organizations] with (nolock)
  ) L1
  ON L1.[parent_organization_id] = main_org.id

  LEFT JOIN 
  
  (SELECT *
  FROM  [dbo].[Organizations] with (nolock)
  ) L2
  ON L2.[parent_organization_id] = L1.id

  LEFT JOIN 
  
  (SELECT *
  FROM  [dbo].[Organizations] with (nolock)
  ) L3
  ON L3.[parent_organization_id] = L2.id

  LEFT JOIN 
  
  (SELECT *
  FROM  [dbo].[Organizations] with (nolock)
  ) L4
  ON L4.[parent_organization_id] = L3.id

  LEFT JOIN 
  
  (SELECT *
  FROM  [dbo].[Organizations] with (nolock)
  ) L5
  ON L5.[parent_organization_id] = L4.id


-- SELECT * FROM #temp_Organizations1


if object_id('tempdb..#temp_Organizations2') is not null drop table #temp_Organizations2
begin
create table #temp_Organizations2 (main_org_id int, main_org_parent_organization_id int, main_org_name nvarchar(500), sub_id int, sub_org_name nvarchar(500))
end

  insert into #temp_Organizations2 (main_org_id, main_org_parent_organization_id, main_org_name, sub_id, sub_org_name)
  SELECT DISTINCT main_org_id, main_org_parent_organization_id, main_org_name, main_org_id, main_org_name
  FROM #temp_Organizations1
  WHERE main_org_id is not NULL

  insert into #temp_Organizations2 (main_org_id, main_org_parent_organization_id, main_org_name, sub_id, sub_org_name)
  SELECT DISTINCT main_org_id, main_org_parent_organization_id, main_org_name, L1_id, L1_org_name
  FROM #temp_Organizations1
  WHERE L1_id is not NULL

  insert into #temp_Organizations2 (main_org_id, main_org_parent_organization_id, main_org_name, sub_id, sub_org_name)
  SELECT DISTINCT main_org_id, main_org_parent_organization_id, main_org_name, L2_id, L2_org_name
  FROM #temp_Organizations1
  WHERE L2_id is not NULL

  insert into #temp_Organizations2 (main_org_id, main_org_parent_organization_id, main_org_name, sub_id, sub_org_name)
  SELECT DISTINCT main_org_id, main_org_parent_organization_id, main_org_name, L3_id, L3_org_name
  FROM #temp_Organizations1
  WHERE L3_id is not NULL

  insert into #temp_Organizations2 (main_org_id, main_org_parent_organization_id, main_org_name, sub_id, sub_org_name)
  SELECT DISTINCT main_org_id, main_org_parent_organization_id, main_org_name, L4_id, L4_org_name
  FROM #temp_Organizations1
  WHERE L4_id is not NULL

  insert into #temp_Organizations2 (main_org_id, main_org_parent_organization_id, main_org_name, sub_id, sub_org_name)
  SELECT DISTINCT main_org_id, main_org_parent_organization_id, main_org_name, L5_id, L5_org_name
  FROM #temp_Organizations1
  WHERE L5_id is not NULL


if object_id('tempdb..#temp_Main') is not null drop table #temp_Main

  select [Assignments].Id, [Organizations].main_org_id orgId, [Organizations].main_org_name orgName, 1 AllCount,
  case when (first_execution_date <= execution_date) then 1 else 0 end inTimeQty,--- Закритих вчасно
  case when (first_execution_date > execution_date) then 1 else 0 end outTimeQty,--- Закритих не вчасно
  case when (first_in_work > execution_date) then 1 else 0 end waitTimeQty,--- Зареєстровано та не надійшло в роботу вчасно
  case when AssignmentResultsId in (4,7,10) and assignment_state_id = 5  then 1 else 0 end doneClosedQty,--- Виконано та закрито
  case when AssignmentResultsId in (5,12) and assignment_state_id = 4  then 1 else 0 end notDoneClosedQty,--- Виконано та на доопрацювання
  case when AssignmentResultsId in (4, 7, 8) and assignment_state_id = 3 then 1 else 0 end doneOnCheckQty,--- Виконано та на перевірці
  case when assignment_state_id = 2  then 1 else 0 end inWorkQty, --В роботі
  Questions.control_date

  into #temp_Main
  from 
  [Assignments] with (nolock) --on [Assignments].executor_organization_id=[Organizations].Id
  
  inner join [Questions] with (nolock) on [Assignments].question_id=[Questions].Id
  inner join #temp_Organizations2 [Organizations] on [Assignments].executor_organization_id=[Organizations].sub_id
  left join (SELECT [assignment_id], Min([edit_date]) as first_execution_date FROM Assignment_History with (nolock) WHERE [assignment_state_id] = 3 GROUP BY [assignment_id]) First_Assigment_execution ON [Assignments].id = First_Assigment_execution.[assignment_id]
  left join (SELECT [assignment_id], Min([edit_date]) as first_in_work FROM Assignment_History with (nolock) WHERE [assignment_state_id] = 2 GROUP BY [assignment_id]) First_In_Work ON [Assignments].id = First_In_Work.[assignment_id]
  where convert(date, Assignments.registration_date) between @dateFrom and @dateTo
  and Questions.question_type_id in (select Id from @question_type_t)
  and [Assignments].main_executor = 1

--  select * from #temp_Main

  if object_id('tempdb..#temp_MainMain') is not null drop table #temp_MainMain

  select orgId Id, orgName, sum(AllCount) AllCount, sum(inTimeQty) inTimeQty, sum(outTimeQty) outTimeQty, sum(waitTimeQty) waitTimeQty,
  sum(doneClosedQty) doneClosedQty, sum(notDoneClosedQty) notDoneClosedQty, sum(doneOnCheckQty) doneOnCheckQty, sum(inWorkQty) inWorkQty
  into #temp_MainMain
  from #temp_Main
  group by orgId, orgName

  select #temp_MainMain.Id, #temp_MainMain.Id orgId, orgName, AllCount, inTimeQty, outTimeQty, waitTimeQty, doneClosedQty, doneOnCheckQty, notDoneClosedQty, inWorkQty,
--- Вираховуємо % вчасно закритих доручень організації виконавця
case 
when inTimeQty != 0 and outTimeQty != 0 and waitTimeQty != 0 then
cast((1- (cast(outTimeQty as numeric(18,6)) + cast(waitTimeQty as numeric(18,6)) ) 
/ (cast(inTimeQty as numeric(18,6)) + cast(outTimeQty as numeric(18,6)) + cast(waitTimeQty as numeric(18,6)) ) 
) * 100 as numeric (36,2) ) 
when inTimeQty = 0 and outTimeQty != 0 and waitTimeQty != 0 then 
cast((1- (cast(outTimeQty as numeric(18,6)) + cast(waitTimeQty as numeric(18,6)) ) 
/ (cast(outTimeQty as numeric(18,6)) + cast(waitTimeQty as numeric(18,6)) ) 
) * 100 as numeric (36,2) )
when inTimeQty != 0 and outTimeQty = 0 and waitTimeQty != 0 then 
cast((1- (cast(outTimeQty as numeric(10,5)) + cast(waitTimeQty as numeric(18,6)) ) 
/ (cast(inTimeQty as numeric(18,6)) + cast(waitTimeQty as numeric(18,6)) ) 
) * 100 as numeric (36,2) )
when inTimeQty != 0 and outTimeQty != 0 and waitTimeQty = 0 then 
cast((1- (cast(outTimeQty as numeric(18,6)) + cast(waitTimeQty as numeric(18,6)) ) 
/ (cast(inTimeQty as numeric(18,6)) + cast(outTimeQty as numeric(18,6)) ) 
) * 100 as numeric (36,2) )
else '0'
end
	as inTimePercent,
case 
when doneClosedQty != 0 and notDoneClosedQty != 0 then 
cast(
cast((cast(notDoneClosedQty as numeric(18,6)) / ( cast(doneClosedQty as numeric(18,6)) + cast(notDoneClosedQty as numeric(18,6)) 
) ) 
* 100 as numeric (36,2) ) as nvarchar(10) ) 
 + N'%'  
 when doneClosedQty = 0 and notDoneClosedQty != 0 then 
cast(
cast((cast(notDoneClosedQty as numeric(18,6)) / ( cast(notDoneClosedQty as numeric(18,6)) 
) ) 
* 100 as numeric (36,2) ) as nvarchar(10) ) 
 + N'%' 

 else '0%'
 end
 as donePercent

  from 
  #temp_MainMain 
  order by AllCount desc