SELECT [Id]
      ,[Name]
  FROM [CRM_1551_Site_Integration].[dbo].[WorkDirectionTypes]
  where  #filter_columns#
  #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
