select distinct isnull([Priority],-1) Id, 
case when claims.[Priority] = 1 then N'1 (Важливо)'
          when claims.[Priority] = 2 then N'2 (Загально)' 
          when claims.[Priority] = 3 then N'3 (Планування)'
          when claims.[Priority] is not null then N''+convert(nvarchar(20),claims.[Priority])
          else isnull(cast([Priority] as nvarchar),N'(пусто)')
end as Name,
[Priority] N2
from   [dbo].[Claims]
   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only