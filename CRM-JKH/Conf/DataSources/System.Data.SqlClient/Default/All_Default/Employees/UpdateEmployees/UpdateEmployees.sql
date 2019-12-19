UPDATE [dbo].[employees]
   SET [organization_id] = @organization_id
      ,[PIB] = @PIB
      ,[position] = @position
      ,[phone_1] = @phone_1
      ,[phone_2] = @phone_2
      ,[UserId] = @User
      ,[updated_at] = getutcdate()
      ,[updated_by] = @user_id
 WHERE Id = @Id