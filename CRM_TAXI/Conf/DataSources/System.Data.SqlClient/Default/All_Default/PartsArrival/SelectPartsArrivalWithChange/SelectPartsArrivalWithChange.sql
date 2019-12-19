-- declare @Id int = 11;

Select 
p.Id as part_id,
c.Id as category_id

from PartArrival pa
join Parts p on p.Id = pa.part_id
join Categories c on c.Id = p.category_id

where pa.Id = @Id