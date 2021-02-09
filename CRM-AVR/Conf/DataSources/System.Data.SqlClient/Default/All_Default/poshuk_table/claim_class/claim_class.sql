select Id, Name
  from   [dbo].[Claim_classes]
   where #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only