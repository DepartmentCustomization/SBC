SELECT
	Organizations.Id,
	Organizations.Name AS organizations_name,
	Contact_phones.Number,
(
		SELECT
			cast(phone.Number AS NVARCHAR(50)) + '; '
		FROM
			Contact_phones AS phone
		WHERE
			phone.Contact_ID IN (
				SELECT
					con.Id
				FROM
					Contacts con
				WHERE
					con.Organisation_ID = (
						SELECT
							org.Id
						FROM
							Organizations AS org
						WHERE
							org.Id = Organizations.Id
					)
			) FOR XML PATH('')
	) AS number_other,
	concat (
		CASE
			WHEN Districts.Name IS NULL THEN Districts.Name
			ELSE Districts.Name + ', '
		END,
		CASE
			WHEN Streets.Name IS NULL THEN Streets.Name
			ELSE Streets.Name + ' '
		END,
		CASE
			WHEN Houses.Number IS NULL THEN Houses.Number
			ELSE Houses.Number
		END,
		CASE
			WHEN Houses.Letter IS NULL THEN Houses.Letter
			ELSE ' ' + Houses.Letter
		END
	) AS adress,
CASE
		WHEN Organizations.is_External_service = 1 
		THEN N'Так'
		ELSE N'Ні'
	END AS is_External_service
FROM
	[dbo].[Organizations] Organizations
	LEFT JOIN [dbo].[Contacts] Contacts ON Contacts.Id = Organizations.Contacts_ID
	LEFT JOIN [dbo].[Contact_phones] Contact_phones ON Contact_phones.Contact_ID = Contacts.Id
	LEFT JOIN [dbo].[Houses] Houses ON Houses.Id = Organizations.Houses_ID
	LEFT JOIN [dbo].[Streets] Streets ON Streets.Street_id = Houses.Street_id
	LEFT JOIN [dbo].[Districts] Districts ON Districts.Id = Houses.District_id
WHERE
	Organizations.Is_WC <> 1
	AND #filter_columns#
		#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;