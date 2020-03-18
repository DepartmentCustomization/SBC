INSERT INTO [dbo].[OutsideMen_Documents]
           ([Name]
           ,[Type_Id]
           ,[OutsideMen_Id]
           ,[Comments])
output [inserted].[Id]
     VALUES
           (@Name
           ,@Type_Id
           ,@OutsideMen_Id
           ,@Comments)