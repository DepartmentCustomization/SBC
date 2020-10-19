
select Id, name
from (

select N'fbbb' Id, N'Вася' name
union all
select N'sfdgs' Id, N'Вася' name
union all
select N'erwtw' Id, N'Вася' name
) t
 where 
  #filter_columns#
  --#sort_columns#
  order by 1
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only