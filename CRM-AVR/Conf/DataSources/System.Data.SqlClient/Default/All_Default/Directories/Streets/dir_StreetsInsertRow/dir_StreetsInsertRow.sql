INSERT INTO [dbo].[Streets]
           ([Name])
           output [inserted].[Id]

     VALUES
           (@Name)