UPDATE [dbo].[Shifts_Person]
   SET 
       [Plan_start_time] = cast(@plan_start_time as time(0))
      ,[Time_count] = abs(@time_count)
      ,[Value] = @value
 WHERE Id = @timeSheet_Id
 
 if @value is not null
 begin
    exec dbo.pr_state_notes_Tebel @timeSheet_Id, @value
 end