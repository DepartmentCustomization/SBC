
INSERT INTO [dbo].[Claim_link_types]
           ([Name])
           output [inserted].[Id]
     VALUES
           (@Name)