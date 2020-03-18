SELECT [Id]
      ,[Name]
  FROM [dbo].[Contact_types]
 WHERE Id in (1,2) 
 and
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only