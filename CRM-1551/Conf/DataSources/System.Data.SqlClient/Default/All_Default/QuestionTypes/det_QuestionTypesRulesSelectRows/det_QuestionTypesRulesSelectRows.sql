  select[Rules].Id, ltrim([Rules].Id)+N'. '+[Rules].name [Rule], [QuestionTypes].name QuestionTypesName, [ExecutorRoleLevel].name ExecutorRoleLevelName,
  [ExecutorRole].name ExecutorRole, [RulesForExecutorRole].priority, 
  case when [RulesForExecutorRole].main=N'true' then N'Так'
  when [RulesForExecutorRole].main=N'false' then N'Ні'end  main,
  [ProcessingKind].Id ProcessingKind_Id, [ProcessingKind].name ProcessingKind_Name
  from   [dbo].[Rules]
  left join   [dbo].[RulesForExecutorRole] on [Rules].Id=[RulesForExecutorRole].rule_id
  left join   [dbo].[QuestionTypes] on [QuestionTypes].rule_id=[Rules].Id
  left join   [dbo].[ExecutorRoleLevel] on [RulesForExecutorRole].executor_role_level_id=[ExecutorRoleLevel].Id
  left join   [dbo].[ExecutorRole] on [RulesForExecutorRole].executor_role_id=[ExecutorRole].Id
  left join   [dbo].[ProcessingKind] on [RulesForExecutorRole].priocessing_kind_id=[ProcessingKind].Id
  where [QuestionTypes].Id=@questionType_Id
  and #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only