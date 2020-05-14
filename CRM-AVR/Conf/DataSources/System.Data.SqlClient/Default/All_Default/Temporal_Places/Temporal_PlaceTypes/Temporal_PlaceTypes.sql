SELECT [Id]
      ,[Name]
  FROM [dbo].[Place_types]
  WHERE 
  (Id BETWEEN 11 AND 20
  AND Id <> 19)
  AND #filter_columns#
  ORDER BY 1
 OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;