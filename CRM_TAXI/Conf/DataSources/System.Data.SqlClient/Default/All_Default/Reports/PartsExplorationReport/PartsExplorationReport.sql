-- declare @category int = 12
declare @startData table (changeId int, carId int, articul nvarchar(100), manufacturer nvarchar(100), [provider] nvarchar(100), cars_number nvarchar(20) )
declare @fact_run table (changeId int, carId int, partId int, fact_period_km int, operational_period_km int, different_run_km int )

Insert into @startData
Select distinct 
pc.Id,
c.Id as carId,
p.articul,
p.manufacturer,
pr.[provider],
c.cars_number

from PartChange pc
inner join Parts p on p.Id = pc.part_id
inner join PartArrival pa on pc.part_id = pa.part_id
inner join Providers pr on pr.Id = pa.provider_id
inner join Cars c on c.Id = pc.cars_id
where p.category_id = @category
and pc.remove_operation_id is not null

Insert into @fact_run
Select distinct 
pc.Id,
pc.cars_id,
pc.part_id,
pc_rem.run_km_install_day - pc.run_km_install_day as fact_period_km,
c.operational_period_km,
(pc_rem.run_km_install_day - pc.run_km_install_day) - c.operational_period_km as different_run_km

from PartChange pc 
inner join PartChange pc_rem on pc.remove_operation_id = pc_rem.Id 
inner join Parts p on p.Id = pc.part_id
inner join Categories c on c.Id = p.category_id

select 
sd.changeId as Id,
sd.articul,
sd.manufacturer,
sd.[provider],
sd.cars_number,
fr.fact_period_km,
fr.operational_period_km,
fr.different_run_km

from @startData sd 
inner join @fact_run fr on sd.changeId = fr.changeId