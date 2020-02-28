INSERT INTO [dbo].[File_Doc_OutsideMen]
           ([Doc_OutsideMen_Id]
           ,[Name]
           ,[File]
           ,[Created_at])
	output [inserted].[Id]
     VALUES
           (@Doc_OutsideMen_Id
           ,@Name
           ,@File
           ,getutcdate()
           )