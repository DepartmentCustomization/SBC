select [Id]
      ,[reportcode]
      ,[diagramcode]
      ,[content]
  from [CRM_1551_Site_Integration].[dbo].[ReportsInfo]
  where #filter_columns#
  --#sort_columns#
  order by 1
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only