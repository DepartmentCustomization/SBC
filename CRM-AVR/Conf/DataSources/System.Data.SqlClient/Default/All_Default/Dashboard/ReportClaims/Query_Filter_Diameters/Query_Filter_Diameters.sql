
select [Id], [Name]  
from (
    select	[Id], [Size] as [Name]
    from Diameters
    ) as t1
where #filter_columns#
 --    #sort_columns#
 order by 2
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only