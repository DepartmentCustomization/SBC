select DISTINCT [AssignmentResolutions].Id, [AssignmentResolutions].Name
  from [CRM_1551_Analitics].[dbo].[TransitionAssignmentStates]
  inner join [CRM_1551_Analitics].[dbo].[AssignmentResolutions] on [TransitionAssignmentStates].new_assignment_resolution_id=[AssignmentResolutions].Id
  --where [new_assignment_result_id]=@result_id
  and   #filter_columns#
  --#sort_columns#
  order by 1
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
