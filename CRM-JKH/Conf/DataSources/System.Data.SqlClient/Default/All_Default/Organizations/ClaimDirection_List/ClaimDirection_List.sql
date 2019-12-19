SELECT 
Id,
[Name] 
FROM dbo.claim_directions
WHERE
 #filter_columns#
 #sort_columns#
 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only