select 
    Id,
    sort as [Name]
from Area
where RouteID = @route_id
and #filter_columns#
    #sort_columns#
    offset @pageOffsetRows rows fetch next @pageLimitRows rows only