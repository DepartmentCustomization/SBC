SELECT [Id]
      ,[ServiceTypeId]
      ,[Name]
  FROM [CRM_1551_GORODOK_Integrartion].[dbo].[ServiceNotification_ServiceTypes]
  WHERE
  #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
