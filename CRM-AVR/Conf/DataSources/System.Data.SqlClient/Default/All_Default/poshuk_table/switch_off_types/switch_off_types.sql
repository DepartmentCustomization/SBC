select Id, Name 
from   [dbo].[SwitchOff_types]
   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only