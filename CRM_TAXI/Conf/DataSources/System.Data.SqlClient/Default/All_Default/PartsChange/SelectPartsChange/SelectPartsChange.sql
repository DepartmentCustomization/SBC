-- declare @Id int = 15;

Select
    pc.Id,
    invoice_consumption,
    convert(varchar(10), pc.create_date, 104) as change_date,
    p.part_name,
    p.articul as new_articul,
	z.articul as old_articul,
    p.manufacturer,
    c.Id as cars_id,
    c.cars_name,
    p.part_price

from PartChange pc
    join Parts p on pc.part_id = p.Id
    join Cars c on c.Id = pc.cars_id
	left join (select pc.Id, part_id, articul, remove_operation_id 
	           from PartChange pc
			   join Parts p on p.Id = pc.part_id
			   where remove_operation_id = @Id) z on z.remove_operation_id = pc.Id
where pc.Id = @Id