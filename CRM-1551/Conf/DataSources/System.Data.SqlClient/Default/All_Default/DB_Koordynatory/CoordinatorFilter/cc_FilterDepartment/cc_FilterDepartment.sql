  select Id, short_name name
  from   [dbo].[Organizations]
  where organization_type_id=1
 /*  and #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
*/