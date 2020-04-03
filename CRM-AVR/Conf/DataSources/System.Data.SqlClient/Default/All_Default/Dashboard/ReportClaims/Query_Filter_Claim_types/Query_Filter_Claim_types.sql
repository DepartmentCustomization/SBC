select [Id], [Name]
from
(
    select  [Id], [Full_Name] as [Name]
    from Claim_types
) as t1
where #filter_columns#
 --    #sort_columns#
 order by 2
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only