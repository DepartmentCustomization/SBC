
INSERT INTO [dbo].[Place_types]
           ([Name])
output [inserted].[Id]

     VALUES
           (@Name)