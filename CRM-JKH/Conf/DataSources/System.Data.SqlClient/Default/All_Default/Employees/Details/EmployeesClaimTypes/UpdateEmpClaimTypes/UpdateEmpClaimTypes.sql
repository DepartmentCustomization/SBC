UPDATE [dbo].[employees_claim_types]
   SET [employee_id] = @employee_id
      ,[claim_type_id] = @claim_type_id
      ,[updated_at] = getutcdate()
      ,[updated_by] = @user_id
 WHERE Id = @Id 