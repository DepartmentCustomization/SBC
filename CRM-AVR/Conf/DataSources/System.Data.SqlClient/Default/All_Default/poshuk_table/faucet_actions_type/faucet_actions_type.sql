select Id, Name 
from   [dbo].[Action_types]
   where id in (231, 48, 232, 151) and 
   #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only