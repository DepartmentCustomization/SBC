SELECT
	DISTINCT [Claims].[Claim_Number],
	concat(Place_types.Name, ': ', Places.Name) AS Adress,
	[Claim_classes].[Name] AS Classes_name,
	[Status].[Name] AS Status_name,
	[Claim_types].[Name] AS Types_name,
	[Claims].[Created_at],
	[Organizations].[Short_Name] AS Organization_name,
	[Claims].[Plan_start_date],
	[Claims].[Plan_finish_at],
	Contacts.Name AS ContactPIB,
	Contact_phones.Number AS ContactPhone,
	Diameters.Size AS Diameters_ID,
	[Claims].[Id]
FROM
	[dbo].[Claims] [Claims]
	LEFT JOIN [dbo].[Status] [Status] ON [Status].[Id] = [Claims].[Status_ID]
	LEFT JOIN [dbo].[Claim_classes] [Claim_classes] ON [Claim_classes].[Id] = [Claims].[Claim_class_ID]
	LEFT JOIN [dbo].[Claim_types] [Claim_types] ON [Claim_types].[Id] = [Claims].[Claim_type_ID]
	LEFT JOIN [dbo].[Organizations] [Organizations] ON [Organizations].[Id] = [Claims].[Response_organization_ID]
	LEFT JOIN [dbo].[Contacts] [Contacts] ON [Contacts].Id = [Claims].Contact_ID
	LEFT JOIN [dbo].[Contact_phones] [Contact_phones] ON [Contact_phones].Contact_ID = Contacts.Id
	LEFT JOIN [dbo].[Diameters] [Diameters] ON [Diameters].Id = [Claims].Diameters_ID
	LEFT JOIN [dbo].[Claim_Order_Places] cop ON cop.Claim_ID = Claims.Id
	AND Is_first_place = 1 
	LEFT JOIN [dbo].[Places] [Places] ON [Places].Id = cop.Place_ID
	LEFT JOIN [dbo].[Place_types] [Place_types] ON [Place_types].Id = [Places].Place_type_ID
WHERE
	DisplayID = 2
	AND #filter_columns#
		#sort_columns#
	OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;