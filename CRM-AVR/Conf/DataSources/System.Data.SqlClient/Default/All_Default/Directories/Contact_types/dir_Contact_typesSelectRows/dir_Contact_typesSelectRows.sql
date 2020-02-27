SELECT [Id]
      ,[Name]
  FROM [dbo].[Contact_types]
 WHERE 
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
