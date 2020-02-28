SELECT [File_Doc_Claim].[Id]
      ,[File_Doc_Claim].[Doc_Claim_Id]
      ,Name
      ,[File_Doc_Claim].[URL]
      ,[File_Doc_Claim].[Created_at]
  FROM [dbo].[File_Doc_Claim]
where [File_Doc_Claim].[Id] = @Id