--  DECLARE @Id INT = 93738;
SELECT
	t_place.[Id] AS Id,
	t_place.[Name] AS place_name,
	Place_types.[Name] AS place_type_name,
	t_place.[Place_type_ID] AS place_type_id,
	Districts.[Name] AS place_district_name,
	t_place.[District_ID] AS place_district_id,
	t_place.[Lattitude],
	t_place.[Longitude],
	IIF(
		t_place.Place_type_ID <> 19,
		Streets.[Id],
		temp_cross_street1.[Id]
	) AS place_street1_id,
	IIF(
		t_place.Place_type_ID <> 19,
		Streets.[Name],
		temp_cross_street1.[Name]
	) AS place_street1_name
FROM
	dbo.[Places] t_place
	LEFT JOIN dbo.[Place_types] Place_types ON Place_types.Id = t_place.Place_type_ID
	LEFT JOIN dbo.[Districts] Districts ON Districts.Id = t_place.District_ID
	LEFT JOIN dbo.[Houses] Houses ON Houses.Id = t_place.Street_id
	LEFT JOIN dbo.[Streets] Streets ON Streets.Street_Id = Houses.Street_id
	LEFT JOIN dbo.[Streets] temp_cross_street1 ON temp_cross_street1.Id = t_place.Street_id
WHERE
	t_place.Id = @Id;