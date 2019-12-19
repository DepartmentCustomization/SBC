--declare @Id int = 1;

declare @removal_part table (part_id int, instrall_date datetime, remove_id int, run_km_onInstall int);

begin
Insert into @removal_part
Select 
p.Id,
pc.install_date,
pc.remove_operation_id,
pc.run_km_install_day

from PartChange pc
join Parts p on p.Id = pc.part_id
where pc.cars_id = @Id 
and remove_operation_id is not null
end

--select * from @removal_part

declare @removeInfo table (Id int, partName nvarchar(100), removeDate datetime, run_km int, run_day int)
insert into @removeInfo 
select 
rp.part_id, 
p.[part_name] as partName,
rd.install_date as removeDate,
rd.run_km_install_day - rp.run_km_onInstall as run_km,
datediff(day, rp.instrall_date, rd.install_date) run_day

from @removal_part rp
join Parts p on p.Id = part_id
join (
select Id, install_date, run_km_install_day
      from PartChange where Id in (select remove_id from @removal_part)
	  ) rd on rd.Id = rp.remove_id

select *
from @removeInfo 