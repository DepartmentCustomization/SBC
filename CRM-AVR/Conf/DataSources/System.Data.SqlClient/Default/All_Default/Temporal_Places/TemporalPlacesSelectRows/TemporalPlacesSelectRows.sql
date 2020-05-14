SELECT 
	t_place.[Id],
	t_place.[Name] AS place_name,
	p_type.[Name] AS place_type,
	district.[Name] AS place_district
FROM dbo.[T_Places] t_place
INNER JOIN dbo.[Place_types] p_type ON p_type.Id = t_place.Place_type_ID
LEFT JOIN dbo.[Districts] district ON district.Id = t_place.District_ID
WHERE #filter_columns#
	    #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;