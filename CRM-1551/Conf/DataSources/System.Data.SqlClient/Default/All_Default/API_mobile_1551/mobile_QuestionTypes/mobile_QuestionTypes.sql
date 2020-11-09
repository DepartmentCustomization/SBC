SELECT 
	qt.[Id],
	qt.[Name],
	qt.[question_type_id] AS [parentId],
	pqt.[name] AS [parentName],
	qt.[Index] 
FROM dbo.[QuestionTypes] qt
left join dbo.[QuestionTypes] pqt on qt.question_type_id=pqt.Id
WHERE 
	#filter_columns#
	#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;