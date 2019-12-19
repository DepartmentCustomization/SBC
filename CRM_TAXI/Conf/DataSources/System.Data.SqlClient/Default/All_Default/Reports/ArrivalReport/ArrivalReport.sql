--declare @dateFrom datetime = '2019-11-01 00:00:00';
--declare @dateTo datetime = current_timestamp;

Select 
arrival.Id,
part.part_name,
part.articul,
part.manufacturer,
provid.[provider],
arrival.part_price,
arrival.part_quantity,
arrival.part_price * arrival.part_quantity as sum_price

from PartArrival arrival
join Parts part on part.Id = arrival.part_id
join Providers provid on provid.Id = arrival.provider_id
where arrival.create_date 
between @dateFrom and dateadd(day,1,@dateTo)