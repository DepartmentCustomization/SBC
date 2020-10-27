SELECT
	[Contacts].[Id],
	[Contacts].[First_name],
	[Contacts].[Middle_name],
	[Contacts].[Surname],
	Contact_types.Name AS contact_types_name,
	Contact_types.Id AS contact_types_id,
CASE
		WHEN len (Houses.Name) = 0 THEN NULL
		ELSE Houses.Name
	END AS house_name,
	Houses.Id AS houses_id,
CASE
		WHEN len(
			concat(
				CASE
					WHEN Flats.Number IS NULL THEN NULL
					ELSE N' кв.' + CAST(Flats.Number AS NVARCHAR(10))
				END,
				CASE
					WHEN Flats.Letter IS NULL THEN NULL
					ELSE N' літ. ' + CAST(Flats.Letter AS NVARCHAR(10))
				END,
				CASE
					WHEN Flats.Floor IS NULL THEN NULL
					ELSE N' під. ' + CAST(Flats.Floor AS NVARCHAR(10))
				END,
				CASE
					WHEN Flats.Porch IS NULL THEN NULL
					ELSE N' пов. ' + CAST(Flats.Porch AS NVARCHAR(10))
				END
			)
		) = 0 THEN NULL
		ELSE concat(
			CASE
				WHEN Flats.Number IS NULL THEN NULL
				ELSE N' кв.' + CAST(Flats.Number AS NVARCHAR(10))
			END,
			CASE
				WHEN Flats.Letter IS NULL THEN NULL 
				ELSE N' літ. ' + CAST(Flats.Letter AS NVARCHAR(10))
			END,
			CASE
				WHEN Flats.Floor IS NULL THEN NULL
				ELSE N' під. ' + CAST(Flats.Floor AS NVARCHAR(10))
			END,
			CASE
				WHEN Flats.Porch IS NULL THEN NULL
				ELSE N' пов. ' + CAST(Flats.Porch AS NVARCHAR(10))
			END
		)
	END AS flats_name,
	Flats.Id AS flats_id,
	Contact_phones.Number AS number_name,
	Contact_phones.Name AS comment_phone,
	Organizations.Name AS organizations_name,
	Organizations.Id AS organizations_id,
	Jobs.Job_name AS job_name,
	Jobs.Id AS job_id,
	Contacts.external_Id
FROM
	[dbo].[Contacts] Contacts
	LEFT JOIN [dbo].[Contact_types] Contact_types ON Contact_types.Id = Contacts.Contact_type_ID
	LEFT JOIN [dbo].[Organizations] Organizations ON Organizations.Id = Contacts.Organisation_ID
	LEFT JOIN [dbo].[Jobs] Jobs ON Jobs.Id = Contacts.Job_ID 
	LEFT JOIN [dbo].[Houses] Houses ON Houses.Id = Contacts.Houses_ID 
	LEFT JOIN [dbo].[Flats] Flats ON Flats.Id = Contacts.Flats_ID
	LEFT JOIN [dbo].[Districts] Districts ON Districts.Id = Houses.District_id
	LEFT JOIN [dbo].[Contact_phones] Contact_phones ON Contact_phones.Contact_ID = Contacts.Id
WHERE
	[Contacts].[Id] = @Id;