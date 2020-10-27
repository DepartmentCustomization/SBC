SELECT
	[Contacts].[Id],
	Contact_types.Name AS contact_type_name,
	Organizations.Name AS organizations_name,
	Organizations.Id AS organizations_id,
	Contacts.Name AS contacts_name,
	cast(tabl_phone.phone_number AS NVARCHAR(12)) AS Number,
	Jobs.Job_name AS jobs_name,
	Positions.Name AS positions_name,
CASE
		WHEN Jobs.is_work = 1 THEN 'Так'
		WHEN Jobs.is_work = 0 THEN 'Ні'
	END is_work
FROM
	[dbo].[Contacts]
	LEFT JOIN Contact_types ON Contact_types.Id = Contacts.Contact_type_ID
	LEFT JOIN Organizations ON Organizations.Id = Contacts.Organisation_ID 
	LEFT JOIN Jobs ON Jobs.Contacts_ID = Contacts.Id
	LEFT JOIN Positions ON Positions.Id = Jobs.Position_ID
	LEFT JOIN (
		SELECT
			Contact_ID,
(
				SELECT
					rtrim(a.Number) + N';' AS 'data()'
				FROM
					dbo.Contact_phones AS a
				WHERE
					b.Contact_ID = a.Contact_ID FOR XML PATH('')
			) AS phone_number
		FROM
			dbo.Contact_phones b
		GROUP BY
			Contact_ID
	) AS tabl_phone ON tabl_phone.Contact_ID = Contacts.Id
WHERE
	Contacts.Job_ID IS NOT NULL
	AND Contact_type_ID = 3
	AND #filter_columns#
		#sort_columns#
	OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;