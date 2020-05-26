SELECT 
s.Id,
ISNULL(st.UkrName + N' ','') + s.[Name]
 +
CASE 
	WHEN s.Old_name IS NOT NULL OR s.Territory IS NOT NULL 
	THEN N' (' ELSE SPACE(0) 
	END
	 +
CASE 
	WHEN s.Old_name IS NOT NULL AND s.Territory IS NOT NULL 
	THEN s.Old_name + N' || ' + s.Territory + N')'
	WHEN s.Old_name IS NOT NULL AND s.Territory IS NULL 
	THEN s.Old_name + N')' 
	WHEN s.Old_name IS NULL AND s.Territory IS NOT NULL 
	THEN s.Territory + N')'
	ELSE SPACE(0) 
	END 
AS streetName
FROM Streets s
LEFT JOIN Street_Type st ON st.TypeId = s.Street_type_id
WHERE s.[Name] 
IS NOT NULL
AND 
 #filter_columns#
 #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;