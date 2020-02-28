SELECT [Id]
      ,[Name]
  FROM [dbo].[SwitchOff_types]
  WHERE Id in (1,5) and
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only