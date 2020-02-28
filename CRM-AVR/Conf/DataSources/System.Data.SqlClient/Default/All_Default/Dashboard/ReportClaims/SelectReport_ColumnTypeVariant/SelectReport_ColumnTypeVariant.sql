SELECT [Id]
      ,[ColumnTypeId]
      ,[Name]
      ,[Code]
      ,[IsActiveVariant]
  FROM [CRM_AVR_Analitics].[dbo].[Report_ColumnTypeVariant]
  where [ColumnTypeId] = @ColumnTypeId
  and IsActiveVariant = 1