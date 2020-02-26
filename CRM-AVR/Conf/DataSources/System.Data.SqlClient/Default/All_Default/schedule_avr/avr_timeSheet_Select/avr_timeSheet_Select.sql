SELECT [Id]
      ,[Job_Id]
      ,[Shift_date]
	  ,DATEPART (dd,[Shift_date]) as [day]
	  ,case 
			when DATEPART (weekday, [Shift_date]) = 1 then 'Нд.'
			when DATEPART (weekday, [Shift_date]) = 2 then 'Пн.'
			when DATEPART (weekday, [Shift_date]) = 3 then 'Вт.'
			when DATEPART (weekday, [Shift_date]) = 4 then 'Ср.'
			when DATEPART (weekday, [Shift_date]) = 5 then 'Чт.'
			when DATEPART (weekday, [Shift_date]) = 6 then 'Пт.'
			when DATEPART (weekday, [Shift_date]) = 7 then 'Сб.'
		end as weekdays
    --   ,[Plan_start_time]
      ,cast(Plan_start_time as time(0)) as Plan_start_time
    --   ,convert(nvarchar(5),[Plan_start_time]) as Plan_start_time
      ,Time_count
	  ,[Value]
  FROM [dbo].[Shifts_Person]
  where Job_Id = @job_id
	and datepart(mm,Shift_date) = @month    /*номер месяца: 1- январь, 4 - апрель, 10 - октябрь*/
	and datepart(yy,Shift_date) = @year