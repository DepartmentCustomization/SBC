INSERT INTO [dbo].[Claim_classes]
           ([Name])
           output [inserted].[Id]
     VALUES
           (@Name)