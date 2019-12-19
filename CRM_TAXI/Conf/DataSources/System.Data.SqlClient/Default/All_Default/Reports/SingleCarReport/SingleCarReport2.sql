    --  declare @dateFrom datetime = '2019-11-01 00:00:00';
    --  declare @dateTo datetime = '2019-12-01 00:00:00';
    --  declare @carId int = 9;
	
if (@dateFrom is not null) 
and (@dateTo is not null) 
begin
Select 
Id, 
part_name,
articul,
manufacturer,
provider,
run_km_period,
run_day_period,
qty,
part_price

from PartsChange_Group
where change_date between 
cast(dateadd(hour,3,@dateFrom) as date)
and cast(dateadd(day,1,@dateTo) as date)
and cars_name = (select cars_name from Cars where Id = @carId)
end

else
begin
set @dateFrom = dateadd(month,-1,current_timestamp)
set @dateTo = cast(current_timestamp as date)
Select 
Id, 
part_name,
articul,
manufacturer,
provider,
run_km_period,
run_day_period,
qty,
part_price

from PartsChange_Group
where change_date between 
@dateFrom and @dateTo
and cars_name = (select cars_name from Cars where Id = @carId)
end
