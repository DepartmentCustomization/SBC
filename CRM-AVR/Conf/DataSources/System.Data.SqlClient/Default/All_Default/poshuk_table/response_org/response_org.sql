select DISTINCT [dbo].[Organizations].Id, [dbo].[Organizations].Short_Name Name
from   [dbo].[Organizations]
   where [Is_WC] = 1 AND [Is_selected] = 1 and #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only