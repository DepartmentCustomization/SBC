
  /*под одну организацию попадают несколько разных секторов, значит обращения будут лететь под разные сектора*/

  IF object_id('tempdb..#temp_sector') is not null 
	BEGIN
		DROP TABLE #temp_sector
	END

    SELECT [Territories].Id sector_id, [Territories].name+ISNULL(N' ('+[Positions].name+N')', N'') sector_name, [PersonExecutorChoose].organization_id
  --[PersonExecutorChooseObjects].object_id, [PersonExecutorChooseObjects].person_executor_choose_id,
  INTO #temp_sector
  FROM [dbo].[Territories]
  INNER JOIN [dbo].[PersonExecutorChooseObjects] ON [Territories].object_id=[PersonExecutorChooseObjects].object_id
  INNER JOIN [dbo].[PersonExecutorChoose] ON [PersonExecutorChooseObjects].person_executor_choose_id=[PersonExecutorChoose].Id
  LEFT JOIN [dbo].[Positions] ON [PersonExecutorChoose].position_id=[Positions].Id

  IF object_id('tempdb..#temp_ass') is not null 
	BEGIN
		DROP TABLE #temp_ass
	END
  
  SELECT Organization_id, 
  SUM([count_arrived]) [count_arrived], --2
  SUM([count_in_work]) [count_in_work], --3
  SUM([count_overdue]) [count_overdue], --4
  SUM([count_clarified]) [count_clarified], --5
  SUM([count_done]) [count_done], --6
  SUM([count_for_revision]) [count_for_revision], --7
  SUM([count_plan_program]) [count_plan_program] --8
  INTO #temp_ass
  FROM
  (
  SELECT [Assignments].Id, [Assignments].executor_organization_id Organization_id,
  CASE WHEN [Assignments].assignment_state_id=1 /*зареєстровано*/ AND [Questions].control_date>=GETUTCDATE() THEN 1 ELSE 0 END [count_arrived], --2
  CASE WHEN [Assignments].assignment_state_id=2 /*в роботі*/ AND [Questions].control_date>=GETUTCDATE() THEN 1 ELSE 0 END [count_in_work], --3
  CASE WHEN [Assignments].assignment_state_id IN (1,2) /*зареєстровано в роботі*/ AND [Questions].control_date<GETUTCDATE() THEN 1 ELSE 0 END [count_overdue], --4
  CASE WHEN [Assignments].assignment_state_id=3 /*на перевірці*/ AND [Assignments].AssignmentResultsId=7 /*роз.яснено*/ THEN 1 ELSE 0 END [count_clarified], --5
  CASE WHEN [Assignments].assignment_state_id=3 /*на перевірці*/ AND [Assignments].AssignmentResultsId=4 /*виконано*/ THEN 1 ELSE 0 END [count_done], --6
  CASE WHEN [Assignments].assignment_state_id=4 /*не виконано*/ AND [Assignments].AssignmentResultsId=5 /*на доопрацюванні*/ THEN 1 ELSE 0 END [count_for_revision], --7
  CASE WHEN [Assignments].assignment_state_id=5 /*закрито*/ AND [Assignments].AssignmentResultsId=7 /*роз.яснено*/ 
  AND last_state_tab.last_state_id=3/*на перевірці*/ AND last_result_tab.last_result_id=8 /*неможливо виконати в даний період*/
  THEN 1 ELSE 0 END [count_plan_program] --8
  FROM [dbo].[QuestionsInTerritory]
  INNER JOIN [dbo].[Questions] ON [QuestionsInTerritory].question_id=[Questions].Id
  INNER JOIN [dbo].[Assignments] ON [Questions].Id=[Assignments].question_id
  --INNER JOIN @person_executor_choose_table p_tab ON [Assignments].[executor_person_id]=p_tab.Id --раскомментировать
  INNER JOIN (SELECT DISTINCT organization_id FROM #temp_sector) [Organizations] ON [Assignments].executor_organization_id=[Organizations].organization_id
  LEFT JOIN (SELECT [Assignment_History].assignment_id, [Assignment_History].assignment_state_id last_state_id
  FROM [dbo].[Assignment_History]
  INNER JOIN 
  (
  SELECT [Assignment_History].assignment_id, MAX([Assignment_History].Id) Id_state
  FROM [dbo].[Assignments]
  INNER JOIN [dbo].[Assignment_History] ON [Assignments].Id=[Assignment_History].assignment_id
  AND [Assignments].assignment_state_id<>[Assignment_History].assignment_state_id
  WHERE [Assignments].assignment_state_id=5 AND [Assignments].AssignmentResultsId=7
  GROUP BY [Assignment_History].assignment_id) tab_last_state ON [Assignment_History].Id=tab_last_state.Id_state) last_state_tab ON [Assignments].Id=last_state_tab.assignment_id

  LEFT JOIN (SELECT [Assignment_History].assignment_id, [Assignment_History].AssignmentResultsId last_result_id
  FROM [dbo].[Assignment_History]
  INNER JOIN 
  (
  SELECT [Assignment_History].assignment_id, MAX([Assignment_History].Id) Id_result
  FROM [dbo].[Assignments]
  INNER JOIN [dbo].[Assignment_History] ON [Assignments].Id=[Assignment_History].assignment_id
  AND [Assignments].AssignmentResultsId<>[Assignment_History].AssignmentResultsId
  WHERE [Assignments].assignment_state_id=5 AND [Assignments].AssignmentResultsId=7
  GROUP BY [Assignment_History].assignment_id) tab_last_result ON [Assignment_History].Id=tab_last_result.Id_result) last_result_tab ON [Assignments].Id=last_result_tab.assignment_id
  ) ass
  GROUP BY Organization_id


  SELECT s.sector_id Id, s.sector_name, [count_arrived], --2
  [count_in_work], --3
  [count_overdue], --4
  [count_clarified], --5
  [count_done], --6
  [count_for_revision], --7
  [count_plan_program] --8
  FROM #temp_ass a 
  INNER JOIN #temp_sector s ON a.Organization_id=s.organization_id

  WHERE #filter_columns#
  --#sort_columns#
  ORDER BY 1
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only