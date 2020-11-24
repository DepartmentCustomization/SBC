SELECT 
	TypeId AS [Id],
	UkrName AS [Name]
FROM dbo.Street_Type
WHERE #filter_columns#
     	#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;