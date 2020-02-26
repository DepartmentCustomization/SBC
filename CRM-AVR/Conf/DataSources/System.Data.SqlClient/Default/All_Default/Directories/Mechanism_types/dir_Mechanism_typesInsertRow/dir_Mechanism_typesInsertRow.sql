INSERT INTO [dbo].[Mechanism_types]
           ([Name]
           ,[Description])
output [inserted].[Id]

     VALUES
           (@Name
           ,@Description)