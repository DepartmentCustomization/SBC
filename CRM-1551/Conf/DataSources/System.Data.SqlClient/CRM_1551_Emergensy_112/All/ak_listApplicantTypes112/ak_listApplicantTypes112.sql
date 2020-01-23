
SELECT [id], [Name]
  FROM [dbo].[ApplicantTypes]
  WHERE #filter_columns#
  --#sort_columns#
  ORDER BY 1
 offset @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY