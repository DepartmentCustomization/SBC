
INSERT INTO [dbo].[TypeAccess]
           ([Name])
    output [inserted].[Id]

     VALUES
           (@Name)