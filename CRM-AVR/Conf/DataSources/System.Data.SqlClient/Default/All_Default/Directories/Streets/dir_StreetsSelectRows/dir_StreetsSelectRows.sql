SELECT
  [Streets].[Id],
  Street_Type.UkrName AS [type_name],
  [Streets].[Name],
  [Streets].[Old_name],
  Streets.Territory
FROM
  [dbo].[Streets]
  LEFT JOIN Street_Type ON Street_Type.TypeId = Streets.Street_type_id
WHERE
  (
    Streets.Street_Id <> 0
    OR Streets.Street_Id IS NULL
  )
  AND #filter_columns#
  ORDER BY
  [Streets].[Name] 
  --#sort_columns#
  OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;