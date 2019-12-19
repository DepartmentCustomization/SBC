--  declare @car int = 1;
--  declare @category int = null;
--  declare @changeId int = 9;

if( (@category is not null) and (@car is not null) and (@changeId is null) )
begin
Select 
p.Id,
p.articul,
p.part_name

from PartChange pc
join Parts p on p.Id = pc.part_id
where cars_id = @car
and p.category_id = @category
and pc.remove_operation_id is null 
and
#filter_columns#
#sort_columns#
 
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only
end 

if( (@category is null) and (@car is not null) and (@changeId is not null) )
begin
declare @old_parts table (changeId int, part_id int, articul int, part_name nvarchar(255) );
begin
Insert into @old_parts 
Select 
pc.Id,
p.Id,
p.articul,
p.part_name

from PartChange pc
join Parts p on p.Id = pc.part_id
where cars_id = @car 
and pc.remove_operation_id is null 
and pc.Id < @changeId

Insert into @old_parts 
Select 
pc.Id,
p.Id,
p.articul,
p.part_name

from PartChange pc
join Parts p on p.Id = pc.part_id
where cars_id = @car 
and pc.remove_operation_id = @changeId
end
delete from @old_parts where changeId = @changeId

select  part_id as Id, articul, part_name from @old_parts
where
#filter_columns#
#sort_columns#
 
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only
end 