SELECT 
	t_place.[Id] AS Id,
	t_place.[Name] AS place_name,
	p_type.[Name] AS place_type_name,
	t_place.[Place_type_ID] AS place_type_id,
	district.[Name] AS place_district_name,
	t_place.[District_ID] AS place_district_id,
	[Lattitude],
	[Longitude], 
	t_place.[Street_id] AS place_street1_id,
	street1.[Name] AS place_street1_name
FROM dbo.[Places] t_place
INNER JOIN dbo.[Place_types] p_type ON p_type.Id = t_place.Place_type_ID
LEFT JOIN dbo.[Districts] district ON district.Id = t_place.District_ID
INNER JOIN dbo.[Streets] street1 ON street1.Id = t_place.Street_id
WHERE t_place.Id = @Id ;