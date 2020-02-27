SELECT [Id]
      ,[Name]
      ,[Type_Id]
      ,[Orders_Id]
      ,[Comments]
  FROM [dbo].[Order_Documents]
  where [Id] = @Id 