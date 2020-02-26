SELECT [Id]
      ,[Name]
  FROM [dbo].[Place_types]
  WHERE Id in (11,16,15,17,28,12,14,18,20)
  and
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only