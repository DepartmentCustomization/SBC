
INSERT INTO [dbo].[Status]
           ([Name]
           ,[Object])
         output [inserted].[Id]

     VALUES
           (
		   @Name
           ,@Object
		   )