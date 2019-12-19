Select 
Id,
cars_name,
cars_number,
cars_mark,
cars_year

from Cars 
where
 #filter_columns#
 #sort_columns#
 
offset @pageOffsetRows rows fetch next @pageLimitRows rows only