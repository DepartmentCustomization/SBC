SELECT 
      Id,
	  [Name] 
FROM dbo.Places
WHERE 
[Name] IS NOT NULL
AND
#filter_columns#
#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;