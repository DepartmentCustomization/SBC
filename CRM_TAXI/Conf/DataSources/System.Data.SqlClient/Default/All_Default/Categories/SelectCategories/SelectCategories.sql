-- declare @Id int = 1;
--------> Если надо посчитать остаток запчастей заданой категории <---------
declare @on_arrival int;
declare @on_changeANDremove int;
declare @available int;

set @on_arrival = (
select 
sum(arrival.part_quantity)
from PartArrival arrival
join Parts part on part.Id = arrival.part_id
where part.category_id = @Id
);

set @on_changeANDremove = (
select 
count(change.Id)
from PartChange change
join Parts part on part.Id = change.part_id
where part.category_id = @Id
);

set @available = isnull(@on_arrival,0) - isnull(@on_changeANDremove,0)
--------------------|*|--------------------------
Select 
Id, 
category_name,
category_description,
operational_period_km,
operational_period_day,
min_count_stock,
@available available

from Categories
where Id = @Id