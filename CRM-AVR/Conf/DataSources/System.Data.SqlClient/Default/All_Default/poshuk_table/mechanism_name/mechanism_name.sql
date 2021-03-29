select Id, Name+N' ('+Number + N')' Name
from   [dbo].[Mechanisms]
   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only