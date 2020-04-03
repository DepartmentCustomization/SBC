declare @date_Shift nvarchar(200);

if len(@Shift_date) = 10
begin
    set @date_Shift = cast(right(left(@Shift_date,5),2)+'.'+left(@Shift_date,2)+'.'+right(@Shift_date,4) as date)
end
else
begin
set @date_Shift = @Shift_date
end;
declare @output table ([Id] int);

INSERT INTO [dbo].[Shifts]
           (
		   [Name]
           ,[Team_ID]
           ,[Mechanism_ID]
           ,[Shift_date]
           ,[Plan_start_time]
           ,[Plan_end_time]
           ,[Fact_start_time]
           ,[Fact_end_time]
		   )
--output [inserted].[Id] into @output([Id])
output [inserted].[Id]
     VALUES
           (@shifts_name
           ,@teams_id
           ,@mechanisms_id
        --   ,cast(dateadd(hour,3,cast(@date_Shift as datetime)) as date)
           ,@date_Shift
           ,isnull(@Plan_start_time, (select top 1 Plan_start_time from Teams where Teams.Id = @teams_id))
           ,isnull(@Plan_end_time, (select top 1 Plan_end_time from Teams where Teams.Id = @teams_id) )
           ,@Fact_start_time
           ,@Fact_end_time
		   )
		   
-- declare @shift_id int;
-- set @shift_id = (select top 1 [Id] from @output);
		   
-- select @shift_id as Id;
-- -- select Id from @output;
-- return;