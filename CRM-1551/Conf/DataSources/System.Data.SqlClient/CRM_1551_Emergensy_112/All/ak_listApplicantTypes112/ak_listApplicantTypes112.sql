
SELECT [id], [Name]
  FROM [dbo].[ApplicantTypes]
  WHERE #filter_columns#
  #sort_columns#
 offset @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY