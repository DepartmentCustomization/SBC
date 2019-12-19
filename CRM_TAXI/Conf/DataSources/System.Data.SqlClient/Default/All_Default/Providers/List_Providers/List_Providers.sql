Select 
Id,
[provider] as provider_name,
provider_conditions 

from Providers
where 
#filter_columns#
#sort_columns#
 
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only