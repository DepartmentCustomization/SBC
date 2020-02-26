SELECT 
s.Id,
ISNULL(st.UkrName + N' ','') + s.[Name] AS streetName
FROM Streets s
LEFT JOIN Street_Type st ON st.TypeId = s.Street_type_id
WHERE s.[Name] 
IS NOT NULL
AND 
  #filter_columns#
  #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY