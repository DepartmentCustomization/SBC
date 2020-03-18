UPDATE [dbo].[Action_types]
   SET [Name] = @Name
      ,[Is_move] = @Is_move
      ,TypeAccess_ID = @TypeAccess_ID
      ,Plan_duration = @Plan_duration
    --   ,Plan_duration = dateadd(hh, 2, @Plan_duration)
      ,Units_Id = @Units_Id
 WHERE Id= @Id
