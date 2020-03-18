UPDATE [dbo].[Jobs]
   SET [Login] = @Login
      ,[Password] = @Password
    --   ,[Job_name] = @job_name
    --   ,[Position_ID] = @positions_id
 WHERE Id = @Id