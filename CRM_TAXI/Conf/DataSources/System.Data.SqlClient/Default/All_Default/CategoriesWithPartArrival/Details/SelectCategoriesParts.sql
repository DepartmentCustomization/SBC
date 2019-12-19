Select 
Id,
articul,
part_name,
part_quantity

from Parts
where category_id = @Id
and
 #filter_columns#
 #sort_columns#
 
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only