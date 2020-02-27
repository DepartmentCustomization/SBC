SELECT 
DISTINCT
      [Claims].[Claim_Number]
      ,concat(Place_types.Name, ': ', Places.Name) as Adress
	  ,[Claim_classes].[Name] as Classes_name
	  ,[Status].[Name] as Status_name
	  ,[Claim_types].[Name] as Types_name
      ,[Claims].[Created_at]
	  ,[Organizations].[Short_Name] as Organization_name
      ,[Claims].[Plan_start_date]
      ,[Claims].[Plan_finish_at]
      ,Contacts.Name as ContactPIB
      ,Contact_phones.Number as ContactPhone
	  ,Diameters.Size as Diameters_ID
	  ,[Claims].[Id]
  FROM [dbo].[Claims]
	LEFT JOIN [dbo].[Status] on [Status].[Id] = [Claims].[Status_ID]
	LEFT JOIN [dbo].[Claim_classes] on [Claim_classes].[Id] = [Claims].[Claim_class_ID]
	LEFT JOIN [dbo].[Claim_types] on [Claim_types].[Id] = [Claims].[Claim_type_ID]
	LEFT JOIN [dbo].[Organizations] on [Organizations].[Id] = [Claims].[Response_organization_ID]
 	left join Contacts on Contacts.Id = Claims.Contact_ID
 	left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
	left join Diameters on Diameters.Id = Claims.Diameters_ID
    LEFT JOIN  Claim_Order_Places cop on cop.Claim_ID = Claims.Id  and Is_first_place = 1
	left join Places on Places.Id = cop.Place_ID
	left join Place_types on Place_types.Id = Places.Place_type_ID
WHERE
DisplayID = 1
AND
#filter_columns#
#sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
