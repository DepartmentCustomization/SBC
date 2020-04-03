select [Id],[Name]  
from Claim_classes
where #filter_columns#
 --    #sort_columns#
 order by 2
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only