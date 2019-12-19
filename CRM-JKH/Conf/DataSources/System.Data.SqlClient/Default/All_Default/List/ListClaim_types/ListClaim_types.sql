select  [Id],
		[Name]
from  [dbo].[claim_types]
where #filter_columns#
  /*#sort_columns#*/
order by 2
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
option (OPTIMIZE FOR UNKNOWN)