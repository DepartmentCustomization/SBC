SELECT [Id]
      ,[Size]
  FROM [dbo].[Diameters]
  WHERE 
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only