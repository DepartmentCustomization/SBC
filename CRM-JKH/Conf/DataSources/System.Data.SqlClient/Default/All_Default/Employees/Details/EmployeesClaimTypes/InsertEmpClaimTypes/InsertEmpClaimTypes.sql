INSERT INTO [dbo].[employees_claim_types]
           ([employee_id]
           ,[claim_type_id]
           ,[created_by]
           ,[updated_by])
     VALUES
           (@employee_id
           ,@claim_type_id
           ,@user_id
           ,@user_id)
