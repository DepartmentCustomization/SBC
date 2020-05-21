IF N'#filter_columns#' <> N'(1 = 1)' 
BEGIN
SELECT
	[Places].[Id],
	Districts.Name AS districts,
	[Places].[Name] AS places_name,
	Place_types.Name AS type_places,
CASE
		WHEN count(Flats.Number) = 0
		OR Places.Place_type_ID IN (19) THEN 'квартири відсутні'
		ELSE concat('Кількість квартир: ', count(Flats.Number))
	END AS flats,
	Streets.Old_name,
	Streets.Territory,
	1 AS sort,
(
		SELECT
			CASE
				WHEN count(Id) > 0 THEN 'Відключен'
			END
		FROM
			Claim_SwitchOff_Address AS csw
		WHERE
			csw.Place_ID = Places.Id
			AND csw.SwitchOff_finish IS NULL
	) AS is_swich
FROM
	[dbo].[Places]
	LEFT JOIN Districts ON Districts.Id = Places.District_ID
	LEFT JOIN Houses ON Houses.Id = Places.Street_id
	LEFT JOIN Streets ON Streets.Street_Id = Houses.Street_id
	LEFT JOIN Place_types ON Place_types.Id = Places.Place_type_ID
	LEFT JOIN Flats ON Flats.Houses_ID = Houses.Id
WHERE [Places].Is_Active = 1 
	AND Place_types.Id IN (11, 12, 14, 15, 16, 17, 18) 
	 -- and Places.Street_id in (select Id from Houses where Street_id = @str_id	) or Places.Street_id is null
	AND #filter_columns#
GROUP BY
	Places.Id,
	Districts.Name,
	[Places].[Name],
	Place_types.Name,
	Places.Place_type_ID,
	Old_name,
	Territory
ORDER BY
	sort,
	places_name OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY
END
ELSE 
BEGIN
SELECT
	[Places].[Id],
	Districts.Name AS districts,
	[Places].[Name] AS places_name,
	Place_types.Name AS type_places,
CASE
		WHEN count(Flats.Number) = 0
		OR Places.Place_type_ID IN (19) THEN 'квартири відсутні'
		ELSE concat('Кількість квартир: ', count(Flats.Number))
	END AS flats,
	Streets.Old_name,
	Streets.Territory,
	1 AS sort,
(
		SELECT
			CASE
				WHEN count(Id) > 0 THEN 'Відключен'
			END
		FROM
			Claim_SwitchOff_Address AS csw
		WHERE
			csw.Place_ID = Places.Id
			AND csw.SwitchOff_finish IS NULL
	) AS is_swich
FROM
	[dbo].[Places]
	LEFT JOIN Districts ON Districts.Id = Places.District_ID
	LEFT JOIN Houses ON Houses.Id = Places.Street_id
	LEFT JOIN Streets ON Streets.Street_Id = Houses.Street_id
	LEFT JOIN Place_types ON Place_types.Id = Places.Place_type_ID
	LEFT JOIN Flats ON Flats.Houses_ID = Houses.Id
WHERE [Places].Is_Active = 1 
	AND	Place_types.Id IN (11, 12, 14, 15, 16, 17, 18)
	AND 1 = 0
GROUP BY
	Places.Id,
	Districts.Name,
	[Places].[Name],
	Place_types.Name,
	Places.Place_type_ID,
	Old_name,
	Territory
END