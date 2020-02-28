INSERT INTO [dbo].[Action_Documents]
           ([Name]
           ,[Type_Id]
           ,[Actions_Id]
           ,[Comments])
output [inserted].[Id]
     VALUES
           (@Name
           ,@Type_Id
           ,@Actions_Id
           ,@Comments)