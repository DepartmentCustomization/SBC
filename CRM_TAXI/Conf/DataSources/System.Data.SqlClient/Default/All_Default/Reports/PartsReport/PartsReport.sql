--  declare @dateFrom datetime = '2019-11-26 22:00:00';
--  declare @dateTo datetime = '2019-11-26 22:00:00';

declare @on_arrival table (articul nvarchar(100), [provider] nvarchar(100), price float, quantity int, sum_price float)
declare @on_change table (articul nvarchar(100), price float, quantity int, sum_price float)

Insert into @on_arrival
Select distinct 
articul,
prov.[provider],
arrival.part_price,
arrival.part_quantity,
part.part_price * arrival.part_quantity as sum_price

from Parts part
join PartArrival arrival on arrival.part_id = part.Id
join Providers prov on prov.Id = arrival.provider_id
where cast(arrival.create_date as date) 
between cast(dateadd(hour,3,@dateFrom) as date) and cast(dateadd(day,1,@dateTo) as date)

-- select * from @on_arrival

Insert into @on_change
Select distinct 
articul,
change.part_price,
isnull(count(change.part_id),0),
change.part_price * count(change.part_id)

from Parts part
left join PartChange change on change.part_id = part.Id 
where cast(change.create_date as date)
between cast(dateadd(hour,3,@dateFrom) as date) and cast(dateadd(day,1,@dateTo) as date)
group by articul, change.part_price

-- select * from @on_change

Select 
Id,
part_name,
articul,
manufacturer,
[provider],
part_price,
qty,
z.part_price * z.qty as sum_price 
from (
Select distinct 
p.Id,
p.part_name,
p.articul,
p.manufacturer,
ar.[provider],
p.part_price,
isnull(ar.quantity - isnull(ch.quantity,0),0) as qty
 
from @on_arrival ar
left join @on_change ch on ch.articul = ar.articul
join Parts p on ar.articul = p.articul
) z
 where qty > 0