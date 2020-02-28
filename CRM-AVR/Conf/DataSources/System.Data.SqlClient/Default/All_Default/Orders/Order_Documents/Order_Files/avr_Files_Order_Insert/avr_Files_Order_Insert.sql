INSERT INTO [dbo].[File_Doc_Order]
           ([Doc_Order_Id]
           ,[Name]
           ,[File]
           ,[Created_at])
	output [inserted].[Id]
     VALUES
           (@Doc_Order_Id
           ,@Name
           ,@File
           ,getutcdate()
           )