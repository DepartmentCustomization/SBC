select  id as Id,
		/*isnull(name_ofFirstLevel_shortToponym,N'')+N' '+*/isnull(name_ofFirstLevel_fullName,N'') as [Name]
from  [dbo].[houses]
where [ofStreet_id] = CONVERT(uniqueidentifier,@Street_id ) 
and #filter_columns#
  /*#sort_columns#*/
order by 2
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
option (OPTIMIZE FOR UNKNOWN)