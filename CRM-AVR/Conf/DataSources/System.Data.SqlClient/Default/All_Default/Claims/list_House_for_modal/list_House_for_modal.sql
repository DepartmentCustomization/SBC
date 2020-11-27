SELECT
  Street_Id AS Id,
  concat(
    st.UkrName,
    ' ',
    Streets.Name,
CASE
      WHEN Old_name IS NULL THEN Old_name
      ELSE concat (' (', Old_name, ')')
    END,
CASE
      WHEN Territory IS NULL THEN Territory
      ELSE concat (' (', Territory, ')')
    END
  ) AS Name
FROM
  dbo.Streets
  LEFT JOIN dbo.Street_Type st ON st.TypeId = Streets.Street_type_id
WHERE
  Street_type_id <> 0
  AND #filter_columns#
      #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY ;