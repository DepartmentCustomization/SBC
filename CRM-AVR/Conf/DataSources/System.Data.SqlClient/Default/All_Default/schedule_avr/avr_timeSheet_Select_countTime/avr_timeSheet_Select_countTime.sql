SELECT sum(case when value is null then Time_count
			else NULL end	) as time_sum
  FROM [dbo].[Shifts_Person]
  where Job_Id = @job_id
	and datepart(mm,Shift_date) = @month
	and datepart(yy,Shift_date) = @year
