SELECT
  Id,
  create_date,
  [name] AS [Name],
  [File]
FROM
  [dbo].[QuestionDocFiles]
WHERE
  question_id = @Id
  AND [File] IS NOT NULL
  AND #filter_columns#
  --	#sort_columns#
ORDER BY 1 
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY
;