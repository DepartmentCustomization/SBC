INSERT INTO [dbo].[SwitchOff_types]
           ([Name])
    output [inserted].[Id]

     VALUES
           (@Name)