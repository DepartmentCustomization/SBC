Select
    pc.Id,
    invoice_consumption,
    convert(varchar(10), pc.create_date, 104) as change_date,
    p.part_name,
    p.articul,
    p.manufacturer,
    c.cars_name,
    pc.part_price

from PartChange pc
    join Parts p on pc.part_id = p.Id
    join Cars c on c.Id = pc.cars_id
where
#filter_columns#
#sort_columns#

offset @pageOffsetRows rows
fetch next @pageLimitRows rows only