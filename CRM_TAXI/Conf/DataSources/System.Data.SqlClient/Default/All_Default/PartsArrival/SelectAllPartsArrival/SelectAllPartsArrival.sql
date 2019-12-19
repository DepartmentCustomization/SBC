Select 
pa.Id, 
invoice_number,
pa.create_date,
p.part_name,
p.articul,
p.manufacturer, 
pr.[provider],
pa.part_price,
pa.part_quantity,
pa.part_price * pa.part_quantity as sum_price

from 
PartArrival pa
join Parts p on p.Id = pa.part_id
join Providers pr on pr.Id = pa.provider_id
where
 #filter_columns#
 #sort_columns#
 
offset @pageOffsetRows rows fetch next @pageLimitRows rows only