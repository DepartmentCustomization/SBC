Select 
Id,
cars_name,
cars_mark,
cars_number

from Cars
where
 #filter_columns#
 #sort_columns#
 
offset @pageOffsetRows rows fetch next @pageLimitRows rows only