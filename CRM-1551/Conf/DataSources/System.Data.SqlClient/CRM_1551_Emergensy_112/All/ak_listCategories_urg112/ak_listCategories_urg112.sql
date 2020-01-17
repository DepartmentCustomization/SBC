
SELECT Id, Name
  FROM [dbo].[Categories]
  WHERE [is_emergensy]='true'
  AND #filter_columns#
  #sort_columns#
 offset @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY