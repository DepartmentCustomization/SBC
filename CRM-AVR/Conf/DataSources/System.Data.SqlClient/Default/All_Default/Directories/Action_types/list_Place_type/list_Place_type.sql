select 
    Id
    ,Name
from Place_types
where 
 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only