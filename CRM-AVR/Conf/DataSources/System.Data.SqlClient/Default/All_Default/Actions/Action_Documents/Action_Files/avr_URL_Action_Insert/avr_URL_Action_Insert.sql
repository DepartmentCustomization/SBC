INSERT INTO [dbo].[File_Doc_Action]
           ([Doc_Action_Id]
           ,[Name]
           ,[URL]
           ,[Created_at])
	output [inserted].[Id]
     VALUES
           (@Doc_Action_Id
           ,@Name
           ,@URL
           ,getutcdate()
           )