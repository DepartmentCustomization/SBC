SELECT [Id]
      ,[name]
  FROM [CRM_1551_Bot_Integration].[dbo].[PollItemDirections]
    where 
  #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only