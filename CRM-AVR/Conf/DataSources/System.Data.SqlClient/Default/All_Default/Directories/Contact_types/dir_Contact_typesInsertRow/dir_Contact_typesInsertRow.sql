INSERT INTO [dbo].[Contact_types]
           ([Name])
           output [inserted].[Id]

     VALUES
           (@Name)