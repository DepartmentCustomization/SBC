UPDATE [dbo].[Teams]
   SET      [Name]=@teams_name
           ,[Plan_start_time]= @Plan_start_time
           ,[Plan_end_time]= @Plan_end_time
WHERE Id= @Id