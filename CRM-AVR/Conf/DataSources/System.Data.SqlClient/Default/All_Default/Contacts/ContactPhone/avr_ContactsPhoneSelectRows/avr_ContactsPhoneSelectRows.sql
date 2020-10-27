SELECT
DISTINCT
	Contacts.[Id],
	Contacts.Name AS contacts_name,
	Contacts.Id AS contacts_id,
	Jobs.Job_name AS jobs_name,
	tabl_phone.phone_number AS number_name,
	tabl_phone.phone_name AS phone_comment 
	-- ,[Contact_phones].[Number] as number_name
	-- ,[Contact_phones].[Name] as phone_comment
FROM
	[dbo].Contacts
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
			) AS phone_number,
(
				SELECT
					rtrim(a.Name) + N';' AS 'data()'
				FROM
					dbo.Contact_phones AS a
				WHERE
					b.Contact_ID = a.Contact_ID FOR XML PATH('')
			) AS phone_name
		FROM
			dbo.Contact_phones b
		GROUP BY
			Contact_ID
	) AS tabl_phone ON tabl_phone.Contact_ID = Contacts.Id 
	LEFT JOIN Jobs ON Jobs.Contacts_ID = Contacts.Id
WHERE
	Jobs.Is_work = 1
	AND Contact_type_ID = 3
	AND Jobs.[Organization_ID] = @Id
	AND #filter_columns#
		#sort_columns#
	OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;