UPDATE [dbo].[organizations]
   SET [Name] = @Name
      ,[claim_direction_id] = @claim_direction_id
      ,[appeal_source_id] = @appeal_source_id
      ,[phone_1] = @phone_1
      ,[phone_2] = @phone_2
      ,[updated_at] = getutcdate()
      ,[updated_by] = @user_id
 WHERE Id = @Id
