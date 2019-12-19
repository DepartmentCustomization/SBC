-- declare @dateFrom datetime = '2019-11-01 00:00:00';
-- declare @dateTo datetime = current_timestamp;

Select 
Id,
part_name,
articul,
manufacturer,
[provider],
part_price,
qty,
sum_price

from PartsChange_Group
where change_date
between @dateFrom and dateadd(day,1,@dateTo)