SELECT [Id]
      ,[Doc_Action_Id]
      ,[Name]
      ,[URL]
      ,[File]
      ,[Created_at]
  FROM [dbo].[File_Doc_Action]
  where Id = @Id