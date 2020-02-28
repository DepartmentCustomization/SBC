INSERT INTO [dbo].[Order_Documents]
           ([Name]
           ,[Type_Id]
           ,[Orders_Id]
           ,[Comments])
output [inserted].[Id]
     VALUES
           (@Name
           ,@Type_Id
           ,@Orders_Id
           ,@Comments)