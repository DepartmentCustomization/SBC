-- DECLARE @date_from datetime = '2020-01-01 00:00:00';
-- DECLARE @date_to datetime = getdate()
SELECT
	Claims.Id,
	org.Short_name AS org_name,
	concat(
		CONVERT(
			VARCHAR(10),
			CAST(Claims.Created_at AS DATE),
			104
		),
		' ',
		CONVERT(VARCHAR(5), CAST(Claims.Created_at AS TIME), 108)
	) AS Created_at,
	Claims.Claim_Number,
	Places.Name AS place_name,
	SUBSTRING(Districts.Name, 1, 5) AS district,
	Claim_types.Full_Name,
	Diameters.Size,
(
		SELECT
			concat(
				ROW_NUMBER() OVER(
					ORDER BY
						[Orders].[Id]
				),
				') '
			) + concat(
				CONVERT(
					VARCHAR(10),
					CAST(Orders.Created_at AS DATE),
					104
				),
				' ',
				CONVERT(VARCHAR(5), CAST(Orders.Created_at AS TIME), 108)
			) + CHAR(10)
		FROM
			Orders
		WHERE
			Orders.Claim_ID = Claims.Id FOR XML PATH (''),
			TYPE
	) AS orders,
	Claims.Description,
(
		SELECT
			Action_types.Name + ' (' + CAST(count(Action_types.Id) AS NVARCHAR(8)) + '); ' + CHAR(13)
		FROM
			Actions
			LEFT JOIN Action_type_Place_type atpt ON atpt.Id = Actions.Action_type_ID
			LEFT JOIN Action_types ON Action_types.Id = atpt.Action_type_Id
		WHERE
			Actions.Claim_ID = Claims.Id
			AND Actions.Do_not = 0
		GROUP BY
			Action_types.Name FOR XML PATH (''),
			TYPE
	) AS actions,
	Claims.Claim_class_ID,
	Claims.Status_ID
FROM
	Claims
	LEFT JOIN Organizations org ON org.Id = Claims.Response_organization_ID
	LEFT JOIN Claim_Order_Places cop ON cop.Claim_ID = Claims.Id
	AND cop.Is_first_place = 1
	LEFT JOIN Places ON Places.Id = cop.Place_ID
	LEFT JOIN Districts ON Districts.Id = Places.District_ID
	LEFT JOIN Diameters ON Diameters.Id = Claims.Diameters_ID
	LEFT JOIN Claim_types ON Claim_types.Id = Claims.Claim_type_ID
WHERE
	CONVERT(DATE, Claims.Created_at) >= @date_from
	AND CONVERT(DATE, Claims.Created_at) <= isnull(@date_to, getdate())
	AND [Claims].[Response_organization_ID] @OrgID
	AND #filter_columns#
	#sort_columns#
ORDER BY
	Claims.Id