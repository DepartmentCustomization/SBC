select
Id,
dollar_date,
dollar_rate

from Dollar_rate
where
 #filter_columns#
 #sort_columns#
 
offset @pageOffsetRows rows fetch next @pageLimitRows rows only