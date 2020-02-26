select [Id], [Name] 
from Districts
where #filter_columns#
 --    #sort_columns#
 order by 2
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only