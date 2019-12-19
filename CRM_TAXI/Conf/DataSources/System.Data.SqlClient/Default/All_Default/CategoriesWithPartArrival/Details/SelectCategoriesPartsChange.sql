--declare @Id int = 3;

declare @removal_part table (part_change_id int, part_id int, invoice_consumption nvarchar(100), 
                             cars_name int, instrall_date datetime, remove_id int);

begin
Insert into @removal_part
Select 
pc.Id,
p.Id as part_id,
pc.invoice_consumption,
c.cars_name,
pc.install_date,
pc.remove_operation_id

from PartChange pc
join Parts p on p.Id = pc.part_id
join Cars c on c.Id = pc.cars_id 

where p.category_id = @Id
end

--select * from @removal_part

declare @removeInfo table (Id int, invoice_consumption nvarchar(100), 
                           part_name nvarchar(100), remove_date datetime, cars_name int)
insert into @removeInfo 
select 
rp.part_change_id as Id,
rp.invoice_consumption,
p.[part_name] as part_name,
rp.instrall_date as remove_date,
rp.cars_name

from @removal_part rp
join Parts p on p.Id = part_id

select *
from @removeInfo 
 order by remove_date desc 
 
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only