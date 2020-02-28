SELECT [Id]
      ,[Name]
  FROM [dbo].[Positions]
  where 
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only