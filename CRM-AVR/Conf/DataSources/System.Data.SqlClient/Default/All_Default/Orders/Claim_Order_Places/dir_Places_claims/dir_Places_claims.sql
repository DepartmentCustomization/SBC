SELECT
	[Places].[Id],
	concat(
		[Places].[Name],
CASE
			WHEN count(Flats.Number) = 0
			OR Places.Place_type_ID IN (19) THEN '' -- 'квартири відсутні' 
			ELSE concat(
				N', (кількість квартир: ',
				count(Flats.Number),
				N')'
			)
		END
	) AS places,
	Districts.Name AS districts,
	Place_types.Name AS type_places,
CASE
		WHEN count(Flats.Number) = 0
		OR Places.Place_type_ID IN (19) THEN N'квартири відсутні'
		ELSE concat(N'Кількість квартир: ', count(Flats.Number))
	END AS flats,
	Streets.Old_name,
	[Places].Comment,
	Streets.Territory,
(
		SELECT
			N'Відкриті заявки:' + (
				SELECT
					DISTINCT rtrim(Claims.Claim_Number) + N';' AS 'data()'
				FROM
					dbo.[Claims]
					LEFT JOIN dbo.[Claim_Order_Places] AS cop ON cop.Claim_ID = Claims.Id --left join Places as pl on pl.Id = cop.Place_ID
				WHERE
					Claims.Status_ID IN (1, 2, 3)
					AND cop.Place_ID = Places.Id FOR XML PATH('')
			)
	) AS open_claims
FROM
	[dbo].[Places] [Places] 
	LEFT JOIN [dbo].[Districts] Districts ON Districts.Id = Places.District_ID
	LEFT JOIN [dbo].[Houses] Houses ON Houses.Id = Places.Street_id
	LEFT JOIN [dbo].[Streets] Streets ON Streets.Street_Id = Houses.Street_id
	LEFT JOIN [dbo].[Place_types] Place_types ON Place_types.Id = Places.Place_type_ID
	LEFT JOIN [dbo].[Flats] Flats ON Flats.Houses_ID = Houses.Id 
WHERE [Places].Is_Active = 1
AND 
	#filter_columns#
GROUP BY
	Places.Id,
	Districts.Name,
	[Places].[Name],
	Place_types.Name,
	Places.Place_type_ID,
	Old_name,
	Territory,
	[Places].Comment
	#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;