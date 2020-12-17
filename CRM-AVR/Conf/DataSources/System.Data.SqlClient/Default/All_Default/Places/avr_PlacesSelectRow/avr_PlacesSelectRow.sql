-- DECLARE @Id INT = 42061;

SELECT
	[Places].[Id],
	Place_types.Name AS place_types_name,
	Place_types.Id AS place_types_id,
	Districts.Name AS distincts_name,
	Districts.Id AS distincts_id,
	Houses.Id AS streets_id,
	Houses.Name AS streets_name,
	str1.Name AS cross_str_name1,
	str1.Street_id AS cross_str_id1,
	str2.Name AS cross_str_name2,
	str2.Street_id AS cross_str_id2,
	Places.Lattitude AS Latitude,
	Places.Longitude,
	CrossSTR.Name AS cross_name,
	CrossSTR.Id AS cross_id,
	Area_House.Id AS area_id,
	Area_House.Name AS area_name,
	Comment 
FROM
	[dbo].[Places] [Places]
	LEFT JOIN [dbo].[Place_types] [Place_types] ON Place_types.Id = Places.Place_type_ID
	LEFT JOIN [dbo].[Districts] [Districts] ON Districts.Id = Places.District_ID
	LEFT JOIN [dbo].[CrossSTR] [CrossSTR] ON CrossSTR.Id = Places.Cross_id
	LEFT JOIN [dbo].[Streets] str1 ON str1.Street_id = CrossSTR.Streets_1_ID
	LEFT JOIN [dbo].[Streets] str2 ON str2.Street_id = CrossSTR.Streets_2_ID
	LEFT JOIN [dbo].[Houses] [Houses] ON Houses.Id = Places.Street_id
	LEFT JOIN [dbo].[Area_House] [Area_House] ON Area_House.Id = Places.Area_id
WHERE
	Places.Id = @Id;