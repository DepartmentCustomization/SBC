
--declare @phone_nunber nvarchar(50)=N'044-564-96-50'; 

declare @today_day date= convert(date, getutcdate()); --сегодняшний день
  declare @first_day_week date = --первый день этой недели
  CASE WHEN DATEPART(DW, @today_day)=1 THEN DATEADD(dd, -6, @today_day)
  ELSE DATEADD(dd, -1*((DATEPART(DW, @today_day))-2), @today_day) END
  declare @end_day_week date=
  CASE WHEN DATEPART(DW, @today_day)=1 THEN @today_day
  ELSE DATEADD(dd, 8-((DATEPART(DW, @today_day))), @today_day) END

  --SELECT @first_day_week, @today_day, @end_day_week

  --все дни, которые вывести

  IF object_id('tempdb..#temp_all_day') IS NOT NULL DROP TABLE #temp_all_day

  select [date], [day] 
  into #temp_all_day
  from [CRM_1551_Analitics].[dbo].[WorkDaysCalendar]
  where [date] between @first_day_week and @end_day_week and is_work='true'

  --select N'Робочий час: '+stuff((select N', '+[day]
  --from #temp_all_day
  --where [day]<>N'Пт'
  --for xml path ('')),1,2,N'')+N': 9:00-18:00'+ISNULL((select N', '+[day]+N' 9:00-17:00' from #temp_all_day where [day]=N'Пт'),N'')




  IF object_id('tempdb..#temp_main_info') IS NOT NULL DROP TABLE #temp_main_info

  select [Positions].Id, [Positions].name Positions_Name,

  [Parent_Positions].position+N'- '+[Organizations].short_name position_Organization,

  [Positions].name+N'- '+[Positions].phone_number position_PIB,

  N'Підпорядковується: '+[Parent_Positions].position+N' ('+[Parent_Positions].name +N')' Parent_Positions_name,

  N'Організація- '+[Organizations].short_name organizations_name,

  [Organizations].Id organizations_id,  
  [Parent_Organizations].Id parent_organizations_Id, [Parent_Organizations].short_name parent_organizations_name,
  [Parent_Organizations].head_name

  
  into #temp_main_info
  from [CRM_1551_Analitics].[dbo].[Positions]
  left join [CRM_1551_Analitics].[dbo].[Positions] [Parent_Positions] on [Positions].parent_id=[Parent_Positions].Id
  inner join [CRM_1551_Analitics].[dbo].[Organizations] on [Positions].organizations_id=[Organizations].Id
  left join [CRM_1551_Analitics].[dbo].[Organizations] [Parent_Organizations] on [Organizations].parent_organization_id=[Parent_Organizations].Id
  where charindex(@phone_nunber, [Positions].phone_number, 1)>0


  select 1 Id, stuff((select distinct N', '+ltrim(Id) from #temp_main_info for xml path('')),1,2,N'') Ids,
  --stuff((select distinct N', '+position_PIB from #temp_main_info for xml path('')),1,2,N'') position_PIB,
  --stuff((select distinct N', '+position_PIB from #temp_main_info for xml path('')),1,2,N'') position_PI
 -- N'-'+stuff((select distinct N', '+phone_number from #temp_main_info for xml path('')),1,2,N'')
   stuff((select distinct N', '+position_Organization from #temp_main_info for xml path('')),1,2,N'') Position_Organization,
   stuff((select distinct N', '+position_PIB from #temp_main_info for xml path('')),1,2,N'') Position_PIB,
   stuff((select distinct N', '+Parent_Positions_name from #temp_main_info for xml path('')),1,2,N'') Parent_Positions_Name,
   stuff((select distinct N', '+organizations_name from #temp_main_info for xml path('')),1,2,N'') Organizations_Name,
   (select N'Робочий час: '+stuff((select N', '+[day]
  from #temp_all_day
  where [day]<>N'Пт'
  for xml path ('')),1,2,N'')+N': 9:00-18:00'+ISNULL((select N', '+[day]+N' 9:00-17:00' from #temp_all_day where [day]=N'Пт'),N'')) WorkDays