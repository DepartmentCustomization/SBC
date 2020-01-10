Select
Id, category_name
from Categories
where #filter_columns#
      #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only