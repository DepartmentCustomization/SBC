SELECT [Id]
      ,[Name]
      ,[Type_Id]
      ,[Actions_Id]
      ,[Comments]
  FROM [dbo].[Action_Documents]
  where [Id] = @Id