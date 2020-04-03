
INSERT INTO [dbo].[Claim_Documents]
           ([Name]
           ,[Type_Id]
           ,[Claims_Id]
           ,[Comments])
output [inserted].[Id]
     VALUES
           (@Name
           ,@Type_Id
           ,@Claims_Id
           ,@Comments)