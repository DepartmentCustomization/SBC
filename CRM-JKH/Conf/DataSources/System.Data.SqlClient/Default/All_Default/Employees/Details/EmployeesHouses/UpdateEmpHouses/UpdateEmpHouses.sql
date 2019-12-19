UPDATE [dbo].[employees_houses]
   SET [employee_id] = @employee_id
      ,[house_id] = convert(uniqueidentifier, @house_id)
      ,[updated_at] = getutcdate()
      ,[updated_by] = @user_id
 WHERE Id = @Id


