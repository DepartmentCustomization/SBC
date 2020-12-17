SELECT [Id]
      ,[Name]
  FROM [dbo].[Place_types]
  WHERE 
    #filter_columns#
    #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only