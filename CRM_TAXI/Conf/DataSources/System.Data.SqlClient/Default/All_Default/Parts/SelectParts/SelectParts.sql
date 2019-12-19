Select 
p.Id, 
category_id,
part_name,
category_name as category,
articul,
manufacturer,
part_quantity,
part_price

from Parts p
join Categories c on c.Id = p.category_id
where p.Id = @Id