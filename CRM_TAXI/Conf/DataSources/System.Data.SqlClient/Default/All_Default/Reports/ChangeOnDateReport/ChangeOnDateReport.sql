-- declare @dateTo datetime = '2019-11-28 00:00:00';

declare @filterDate date = cast(dateadd(hour, 3, @dateTo) as date);

Select 
Id,
part_name,
articul,
manufacturer,
[provider],
run_km_period,
run_day_period,
cars_number,
part_price,
qty,
sum_price

from PartsChange_Group
where change_date <= @filterDate