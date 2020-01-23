
SELECT [id], [Name]
  FROM [dbo].[WorkLines]
  WHERE #filter_columns#
  --#sort_columns#
  ORDER BY 1
 offset @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY