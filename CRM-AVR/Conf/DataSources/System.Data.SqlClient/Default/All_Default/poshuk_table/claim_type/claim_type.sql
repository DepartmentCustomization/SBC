select Id, Full_name name
  from   [dbo].[Claim_types]
   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only