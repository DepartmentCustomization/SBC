SELECT 
	[Id],
	[Name],
	[question_type_id] AS [parentId],
	[Index] 
FROM dbo.[QuestionTypes] 
WHERE 
	#filter_columns#
	#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;