SELECT [Id]
      ,[Name]
  FROM [dbo].[Districts]
  WHERE 
      #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only