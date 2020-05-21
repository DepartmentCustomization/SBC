SELECT
	[Places].[Id],
	Districts.Name AS distincts_name,
	Place_types.Name AS place_types_name,
	[Places].[Name] AS places_name,
	concat(Street_Type.UkrName, ' ', Streets.Name) AS streets_name
FROM
	[dbo].[Places] Places
	LEFT JOIN [dbo].[Place_types] Place_types ON Place_types.Id = Places.Place_type_ID
	LEFT JOIN [dbo].[Districts] Districts ON Districts.Id = Places.District_ID
	LEFT JOIN [dbo].[Houses] Houses ON Houses.Id = Places.Street_id
	LEFT JOIN [dbo].[Streets] Streets ON Streets.Street_id = Houses.Street_id
	LEFT JOIN [dbo].[Street_Type] Street_Type ON Street_Type.TypeId = Streets.Street_type_id
WHERE Places.Is_Active = 1
AND
	#filter_columns#
	#sort_columns#
	OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY