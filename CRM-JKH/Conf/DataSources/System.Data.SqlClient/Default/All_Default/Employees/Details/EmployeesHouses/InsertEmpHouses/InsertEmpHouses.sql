INSERT INTO [dbo].[employees_houses]
           ([employee_id]
           ,[house_id]
           ,[created_by]
           ,[updated_by])
     VALUES
           (@employee_id
           ,convert(uniqueidentifier, @house_id)
           ,@user_id
           ,@user_id)