select Id, [Name]
  from
  (
  select Id, [emergensy_name]
  from [dbo].[Emergensy]) r
  where #filter_columns#
  #sort_columns#
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only