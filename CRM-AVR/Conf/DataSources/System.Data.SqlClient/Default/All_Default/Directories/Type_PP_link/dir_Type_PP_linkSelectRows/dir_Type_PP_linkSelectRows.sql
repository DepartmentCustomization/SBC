SELECT [Id]
      ,[Name]
  FROM [dbo].[Type_PP_link]
  WHERE 
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only