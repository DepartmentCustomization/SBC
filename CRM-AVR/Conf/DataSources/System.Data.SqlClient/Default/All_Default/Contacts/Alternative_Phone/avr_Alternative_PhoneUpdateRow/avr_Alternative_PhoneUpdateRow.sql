update  [dbo].[Contact_phones]
          SET [Number] = @contact_number
           ,[Name] = @contact_comment
WHERE Id = @Id