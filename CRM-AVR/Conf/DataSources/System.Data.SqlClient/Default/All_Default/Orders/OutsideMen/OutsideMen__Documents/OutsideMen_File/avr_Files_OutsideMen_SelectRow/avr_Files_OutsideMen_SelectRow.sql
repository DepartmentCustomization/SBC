SELECT [Id]
      ,[Doc_OutsideMen_Id]
      ,[Name]
      ,[URL]
      ,[File]
      ,[Created_at]
  FROM [dbo].[File_Doc_OutsideMen]
  where Id = @Id