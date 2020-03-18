SELECT [Id]
      ,[Name]
      ,[Description]
  FROM [dbo].[Mechanism_types]
  WHERE 
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only