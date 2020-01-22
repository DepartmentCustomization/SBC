
SELECT [id], [Name]
  FROM [dbo].[Classes]
  WHERE #filter_columns#
  #sort_columns#
 offset @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY