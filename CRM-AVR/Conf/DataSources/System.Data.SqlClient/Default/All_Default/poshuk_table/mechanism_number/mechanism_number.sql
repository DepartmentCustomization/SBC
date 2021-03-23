select Id, Number Name 
from   [dbo].[Mechanisms]
   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only