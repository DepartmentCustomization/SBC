
select  id as Id,
		isnull(name_shortToponym,N'')+N' '+isnull(name_fullName,N'') as [Name]
from  [dbo].[streets]
where #filter_columns#
  #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
option (OPTIMIZE FOR UNKNOWN)