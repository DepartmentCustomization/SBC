-- declare @Id int = 1;

select
    p.Id as Id,
    p.[part_name] as partName,
    p.articul,
    pc.install_date,
    x.partQty,
    p.part_price

from PartChange pc
    join Parts p on p.Id = pc.part_id
    join (select pc.part_id, COUNT(pc.Id) as partQty
    from PartChange pc
        join Parts p on pc.part_id = p.Id
    where cars_id = @Id
    group by part_id) x on x.part_id = pc.part_id

where pc.cars_id = @Id
    and remove_operation_id is null
    and
 #filter_columns#
 #sort_columns#
 
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only