INSERT INTO [dbo].[Type_PP_link]
           ([Name])
           output [inserted].[Id]

     VALUES
           (@Name)