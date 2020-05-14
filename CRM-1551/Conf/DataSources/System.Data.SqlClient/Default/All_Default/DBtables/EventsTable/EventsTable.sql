/*
DECLARE @organization_id INT = 1;
DECLARE @user_id NVARCHAR(300) = N'02ece542-2d75-479d-adad-fd333d09604d';
DECLARE @OtKuda NVARCHAR(20) = N'Система';
DECLARE @TypeEvent NVARCHAR(20) = N'Не активні';-- N'Усі'
*/

DECLARE @TypeEvent_table TABLE (name NVARCHAR(20));
DECLARE @OtKuda_table TABLE (name NVARCHAR(20));

 if OBJECT_ID('tempdb..#temp_orgs') is not null drop table #temp_orgs

 if OBJECT_ID('tempdb..#temp_ob_in_org') is not null drop table #temp_ob_in_org


	  DECLARE @OrganizationId INT = CASE
  WHEN @organization_id IS NOT NULL THEN @organization_id
  ELSE (
    SELECT organization_id
        FROM [CRM_1551_Analitics].[dbo].[Workers] WHERE worker_user_id = @user_id
  )
END;


		with
		it as --дети @id
		(select Id, [parent_organization_id] ParentId, name
		from [dbo].[Organizations] t with (nolock)
		where id=@OrganizationId
		union all
		select t.Id, t.[parent_organization_id] ParentId, t.name
		from [dbo].[Organizations] t with (nolock)
		inner join it on t.[parent_organization_id]=it.Id)

select Id 
into #temp_orgs
from it-- pit it

CREATE INDEX in_id ON #temp_orgs (Id); -- создание индекса


select distinct
	eo.object_id 
into #temp_ob_in_org
from #temp_orgs org
inner join ExecutorInRoleForObject as eo with (nolock) on eo.executor_id = org.Id
where eo.object_id is not null


CREATE INDEX in_object_id ON #temp_ob_in_org (object_id); -- создание индекса


--SELECT * FROM #temp_questions


if OBJECT_ID('tempdb..#temp_ObjectsEvent') is not null drop table #temp_ObjectsEvent

create table #temp_ObjectsEvent (event_id int, object_id int, object_name nvarchar(500))


if OBJECT_ID('tempdb..#temp_Events_1') is not null drop table #temp_Events_1


  select Id, 
    active, 
    [plan_end_date], 
    gorodok_id, 
    event_type_id, 
    start_date, 
    EventName
	into #temp_Events_1
   from (
  select 
    [Events].Id, 
    [Events].active, 
    [Events].[plan_end_date], 
    [Events].gorodok_id, 
    [Events].event_type_id, 
    [Events].start_date, 
    [Event_Class].name EventName
  from [CRM_1551_Analitics].[dbo].[Events] with (nolock)
    inner join [CRM_1551_Analitics].[dbo].[EventOrganizers] with (nolock) on [Events].Id=[EventOrganizers].event_id
	inner join #temp_orgs orgs ON [EventOrganizers].organization_id=orgs.Id
    left join [Event_Class] with (nolock) on [Events].event_class_id=[Event_Class].id
	WHERE CASE WHEN @OtKuda=N'Усі' THEN 5 
	WHEN @OtKuda=N'Городок' THEN [Events].gorodok_id 
	WHEN @OtKuda=N'Система' AND ISNULL([Events].gorodok_id, 2)<>1 THEN 2
	END
	= CASE WHEN @OtKuda=N'Усі' THEN 5 
	WHEN @OtKuda=N'Городок' THEN 1
	WHEN @OtKuda=N'Система' THEN 2
	END

	AND 

	CASE WHEN @TypeEvent=N'В роботі' AND [Events].active =1 and [Events].[plan_end_date]>getutcdate() then 4
        WHEN @TypeEvent=N'Прострочені' AND [Events].active =1 and [Events].[plan_end_date]<=getutcdate() then 4
        when @TypeEvent=N'Не активні' AND [Events].active =0 then 4
    END =4
  
  union
  
  select 
    [Events].Id, 
    [Events].active, 
    [Events].[plan_end_date], 
    [Events].gorodok_id, 
    [Events].event_type_id, 
    [Events].start_date, 
    [Event_Class].name EventName
  from [CRM_1551_Analitics].[dbo].[Events] with (nolock)
    inner join [CRM_1551_Analitics].[dbo].[EventObjects] with (nolock) on [Events].Id=[EventObjects].event_id --AND [EventObjects].in_form = 1
    inner join [CRM_1551_Analitics].[dbo].[Objects] with (nolock) on [EventObjects].object_id=[Objects].Id
    inner join [CRM_1551_Analitics].[dbo].[Buildings] with (nolock) on [Buildings].Id=[Objects].builbing_id
    inner join [CRM_1551_Analitics].[dbo].[ExecutorInRoleForObject] with (nolock) on [ExecutorInRoleForObject].object_id=[Buildings].Id
	inner join #temp_orgs orgs ON [ExecutorInRoleForObject].executor_id=orgs.Id
    left join [Event_Class] with (nolock) on [Events].event_class_id=[Event_Class].id
	WHERE CASE WHEN @OtKuda=N'Усі' THEN 5 
	WHEN @OtKuda=N'Городок' THEN [Events].gorodok_id 
	WHEN @OtKuda=N'Система' AND ISNULL([Events].gorodok_id, 2)<>1 THEN 2
	END
	= CASE WHEN @OtKuda=N'Усі' THEN 5 
	WHEN @OtKuda=N'Городок' THEN 1
	WHEN @OtKuda=N'Система' THEN 2
	END

	AND 

	CASE WHEN @TypeEvent=N'В роботі' AND [Events].active =1 and [Events].[plan_end_date]>getutcdate() then 4
        WHEN @TypeEvent=N'Прострочені' AND [Events].active =1 and [Events].[plan_end_date]<=getutcdate() then 4
        when @TypeEvent=N'Не активні' AND [Events].active =0 then 4
    END =4
  ) t;


  CREATE INDEX in_id ON #temp_Events_1 (Id); -- создание индекса


    if OBJECT_ID('tempdb..#temp_questions') is not null drop table #temp_questions

select  
q.Id
,q.event_id
into #temp_questions
FROM [Questions] as q with (nolock)
inner join #temp_Events_1 as e on q.event_id = e.Id
  

  if OBJECT_ID('tempdb..#temp_Events_gorodok') is not null drop table #temp_Events_gorodok


    SELECT distinct
	     gl.[claim_number] as Id
      ,case when gl.fact_finish_date is null then 1
		    else 0 end as active 
      ,gl.[plan_finish_date] as plan_end_date
      ,1 as [gorodok_id]
	  ,null as event_type_id
	    ,gl.[registration_date] as [start_date]
      ,gl.claims_type as EventName
	  into #temp_Events_gorodok 
  FROM [CRM_1551_GORODOK_Integrartion].[dbo].[Lokal_copy_gorodok_global] AS gl with (nolock)
      INNER JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[AllObjectInClaim] AS oc with (nolock) ON oc.claims_number_id = gl.claim_number
	  INNER JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[Gorodok_1551_houses] gh with (nolock) ON gh.gorodok_houses_id = oc.object_id
	  INNER JOIN #temp_ob_in_org temp_ob_in_org ON gh.[1551_houses_id]=temp_ob_in_org.object_id
 WHERE CASE WHEN @OtKuda IN (N'Усі', N'Городок') THEN 1 ELSE 2 END=1

	AND 

	CASE WHEN @TypeEvent=N'В роботі' AND gl.fact_finish_date is null and gl.[plan_finish_date]>getutcdate() then 4
        WHEN @TypeEvent=N'Прострочені' AND gl.fact_finish_date is null and gl.[plan_finish_date]<=getutcdate() then 4
        when @TypeEvent=N'Не активні' AND gl.fact_finish_date is not null then 4
    END =4


 CREATE INDEX in_id ON #temp_Events_gorodok (Id); -- создание индекса

 --добавление объетков начало
  insert into #temp_ObjectsEvent (event_id, object_id, object_name)
  
  select e1.Id event_id, [EventObjects].object_id, [Objects].name object_name
  from #temp_Events_1 e1
  inner join [dbo].[EventObjects] on e1.Id=[EventObjects].event_id
  inner join [dbo].[Objects] ON [EventObjects].object_id=[Objects].Id
  union
  select e1.Id event_id, [ExecutorInRoleForObject].object_id, [Objects].name object_name
  from #temp_Events_1 e1
  inner join [CRM_1551_Analitics].[dbo].[EventObjects] with (nolock) on e1.Id=[EventObjects].event_id --AND [EventObjects].in_form = 1
    inner join [CRM_1551_Analitics].[dbo].[Objects] with (nolock) on [EventObjects].object_id=[Objects].Id
    inner join [CRM_1551_Analitics].[dbo].[Buildings] with (nolock) on [Buildings].Id=[Objects].builbing_id
    inner join [CRM_1551_Analitics].[dbo].[ExecutorInRoleForObject] with (nolock) on [ExecutorInRoleForObject].object_id=[Buildings].Id
  where [ExecutorInRoleForObject].[executor_role_id] in (1, 68) /*балансоутримувач, генпідрядник*/
  
 union

 select teg.Id event_id, oc.object_id, o.name object_name
 from #temp_Events_gorodok teg
 INNER JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[AllObjectInClaim] AS oc with (nolock) ON oc.claims_number_id = teg.id
 INNER JOIN [dbo].[Objects] o ON o.Id = oc.object_id
  --добавление объетков #temp_Events_gorodok конец

  --select * from #temp_Events_gorodok

  CREATE INDEX in_event_id ON #temp_ObjectsEvent (event_id); -- создание индекса


 if OBJECT_ID('tempdb..#temp_main') is not null drop table #temp_main


  select event_Id, 
    EventType, 
    question_Id, 
	gorodok_id,
    start_date, 
    plan_end_date, 
    EventName,
    TypeEvent,
    OtKuda
  into #temp_main
  from
  (
  select 
    [Events_1].Id event_Id, 
    [EventTypes].name EventType, 
    Questions.Id question_Id, 
	[Events_1].gorodok_id,
    [Events_1].start_date, 
    [Events_1].plan_end_date, 
    [Events_1].EventName,
    case when [Events_1].active =1 and [Events_1].[plan_end_date]>getutcdate() then N'В роботі'
        when [Events_1].active =1 and [Events_1].[plan_end_date]<=getutcdate() then N'Прострочені'
        when [Events_1].active =0 then N'Не активні' 
    end TypeEvent,
    case when [Events_1].gorodok_id=1 then N'Городок' else N'Система' 
    end OtKuda
  from #temp_Events_1 [Events_1]
    --left join EventQuestionsTypes with (nolock) on EventQuestionsTypes.event_id = [Events_1].Id 
    --left join [EventObjects] with (nolock) on [EventObjects].event_id = [Events_1].Id
	left join #temp_questions as Questions on Questions.event_id =[Events_1].Id 
    left join [EventTypes] on [Events_1].event_type_id=[EventTypes].Id

    UNION   
	
    select 
    [Events_gorodok].Id event_Id, 
    N'...' as EventType, 
    null as question_Id, 
	[Events_gorodok].gorodok_id,
    [Events_gorodok].start_date, 
    [Events_gorodok].plan_end_date, 
    [Events_gorodok].EventName,
    case when [Events_gorodok].active =1 and [Events_gorodok].[plan_end_date]>getutcdate() then N'В роботі'
        when [Events_gorodok].active =1 and [Events_gorodok].[plan_end_date]<=getutcdate() then N'Прострочені'
        when [Events_gorodok].active =0 then N'Не активні' 
    end TypeEvent,
    case when [Events_gorodok].gorodok_id=1 then N'Городок' else N'Система' 
    end OtKuda
  from #temp_Events_gorodok [Events_gorodok]
  ) t

  CREATE INDEX in_id ON #temp_main (event_Id); -- создание индекса


  select event_Id EventId,
  OtKuda AS base,
  ISNULL(gorodok_id,0) gorodok_id,
  EventType,
  EventName,
  stuff((select N', '+ISNULL(object_name, N'') from #temp_ObjectsEvent where event_id=tm.event_Id for xml path('')),1,2,N'') objectName,
  --objectName,
  start_date,
  plan_end_date,
  --ISNULL(CountQuestions,0) AS CountQuestions
  count(question_Id) CountQuestions
  from #temp_main tm
  where #filter_columns#
  -- #sort_columns#
   --order by 1
 
  group by event_Id,
  OtKuda,
  gorodok_id,
  EventType,
  EventName,
  start_date,
  plan_end_date
order by 1
offset @pageOffsetRows rows fetch next @pageLimitRows rows only