INSERT INTO [dbo].[Contact_phones]
           ([Contact_ID]
           ,[Number]
           ,[Name])
output [inserted].[Id]
     VALUES
           (@Contact_ID
           ,@contact_number
           ,@contact_comment)