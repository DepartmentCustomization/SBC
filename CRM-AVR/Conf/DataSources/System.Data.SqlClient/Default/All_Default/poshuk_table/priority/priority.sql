select distinct isnull([Priority],-1) Id, isnull(cast([Priority] as nvarchar),'(none)') Name, [Priority] N2
from   [dbo].[Claims]
   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only