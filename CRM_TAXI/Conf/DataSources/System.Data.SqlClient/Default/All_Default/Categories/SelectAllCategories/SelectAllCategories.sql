Select 
Id, 
category_name,
category_description,
operational_period_km,
operational_period_day,
min_count_stock
from Categories
where
 #filter_columns#
 #sort_columns#
 
offset @pageOffsetRows rows fetch next @pageLimitRows rows only