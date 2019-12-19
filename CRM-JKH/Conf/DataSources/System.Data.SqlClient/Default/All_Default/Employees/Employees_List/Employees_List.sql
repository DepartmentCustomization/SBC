SELECT 
Id,
PIB
FROM dbo.employees
WHERE
 #filter_columns#
 #sort_columns#
 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only