if (select Shift_date from Shifts where Id = @Id) >= cast(getdate() as date)
begin
UPDATE [dbo].[Shifts]
   SET [Name] = @shifts_name
      ,[Team_ID] = @teams_id
      ,[Shift_date] =  cast(dateadd(hour,3,cast(@Shift_date as datetime)) as date)
      ,[Plan_start_time] = @Plan_start_time
      ,[Plan_end_time] = @Plan_end_time
      ,[Fact_start_time] = @Fact_start_time
      ,[Fact_end_time] = @Fact_end_time
      ,[Mechanism_ID] = @mechanisms_id
 WHERE Id = @Id
 end