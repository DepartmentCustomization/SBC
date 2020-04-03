SELECT [Id]
      ,[Doc_Order_Id]
      ,[Name]
      ,[URL]
      ,[File]
      ,[Created_at]
  FROM [dbo].[File_Doc_Order]
  where Id = @Id