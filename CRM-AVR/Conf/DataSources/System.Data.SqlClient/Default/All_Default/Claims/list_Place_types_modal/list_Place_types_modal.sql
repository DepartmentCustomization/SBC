SELECT [Id]
      ,[Name]
  FROM [dbo].[Place_types]
  WHERE Id not in (6,19,10)
  and
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only