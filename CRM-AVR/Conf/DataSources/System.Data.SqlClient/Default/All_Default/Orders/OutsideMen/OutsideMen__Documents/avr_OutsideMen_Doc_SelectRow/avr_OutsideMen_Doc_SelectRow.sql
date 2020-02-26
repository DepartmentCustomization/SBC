SELECT [Id]
      ,[Name]
      ,[Type_Id]
      ,[OutsideMen_Id]
      ,[Comments]
  FROM [dbo].[OutsideMen_Documents]
  where [Id] = @Id 