select 
Id
,Name
,ShortName
from Schedule_dir
where   #filter_columns#
  #sort_columns#
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only