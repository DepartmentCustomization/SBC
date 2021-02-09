select distinct Number Id, Number Name 
from   [dbo].[Flats]
   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only