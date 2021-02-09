select Id, Name
from
(
select -1 Id, '(none)'  Name

UNION 

select Id, Name 
from   [dbo].[Districts]
) a
   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only