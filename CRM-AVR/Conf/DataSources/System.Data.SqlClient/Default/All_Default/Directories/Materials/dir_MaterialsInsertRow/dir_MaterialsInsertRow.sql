INSERT INTO [dbo].[Materials]
           ([Name]
           ,[With_diameter]
           ,Units_id)
output [inserted].[Id]

     VALUES
           (@Name
           ,@With_diameter
           ,@units_id)