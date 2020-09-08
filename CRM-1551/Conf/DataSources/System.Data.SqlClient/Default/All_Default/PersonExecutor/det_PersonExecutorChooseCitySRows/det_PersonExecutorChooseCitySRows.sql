select [PersonExecutorChoose].Id, [City].name
  from [dbo].[City], [dbo].[PersonExecutorChoose]
  where [PersonExecutorChoose].Id=@person_executor_choose_id and
  #filter_columns#
  --#sort_columns#
  order by 1
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
