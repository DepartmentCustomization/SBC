SELECT 
      Id,
	  [Name] 
FROM [dbo].[Places]
WHERE Is_Active = 1
AND [Name] IS NOT NULL
AND
#filter_columns#
#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;