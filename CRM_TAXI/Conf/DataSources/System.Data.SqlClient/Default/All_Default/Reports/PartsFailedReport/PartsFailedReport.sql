select 
Id,
part_name,
manufacturer,
[provider],
fact_run,
cars_name
from ( 
Select distinct 
pc1.Id,
p.part_name,
p.manufacturer,
pr.[provider],
pc2.run_km_install_day - pc1.run_km_install_day as fact_run,
c.cars_name,
ct.operational_period_km

from PartChange pc1 
join Parts p on p.Id = pc1.part_id
join PartArrival pa on p.Id = pa.part_id
join Providers pr on pr.Id = pa.provider_id
join Cars c on c.Id = pc1.cars_id
join Categories ct on ct.Id = p.category_id
join PartChange pc2 on pc2.Id = pc1.remove_operation_id
where pc1.remove_operation_id is not null
) z
where fact_run < operational_period_km