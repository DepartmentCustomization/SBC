SELECT [Id]
      ,[name]
  FROM   [dbo].[AssignmentResolutions]
  where #filter_columns#
  #sort_columns#
  --offset @pageOffsetRows rows fetch next @pageLimitRows rows only