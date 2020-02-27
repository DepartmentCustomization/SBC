SELECT [Id]
      ,[Name]
  FROM [CRM_AVR_Analitics].[dbo].[Places]
  where Place_type_ID = 11
  and 
	#filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only