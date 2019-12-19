Select 
p.Id, 
category_id,
part_name,
category_name,
articul,
manufacturer

from Parts p
join Categories c on c.Id = p.category_id
where
 #filter_columns#
 #sort_columns#
 
offset @pageOffsetRows rows fetch next @pageLimitRows rows only