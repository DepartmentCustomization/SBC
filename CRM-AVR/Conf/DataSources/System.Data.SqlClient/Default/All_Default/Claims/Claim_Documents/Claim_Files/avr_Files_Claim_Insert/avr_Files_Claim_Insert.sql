INSERT INTO [dbo].[File_Doc_Claim]
           ([Doc_Claim_Id]
           ,[Name]
           ,[File]
           ,[Created_at])
	output [inserted].[Id]
     VALUES
           (@Doc_Claim_Id
           ,@Name
           ,@File
           ,getutcdate()
           )