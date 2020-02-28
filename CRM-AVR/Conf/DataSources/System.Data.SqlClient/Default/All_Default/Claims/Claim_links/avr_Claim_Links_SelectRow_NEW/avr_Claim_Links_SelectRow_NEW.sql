SELECT [Claims].[Id]
      ,[Claims].[Id] as claims_id 
      ,[Claims].[Claim_Number]
	  ,[Claim_classes].[Name] as classes_name
		,[Claim_classes].[Id] as Classes_id
	  ,[Status].[Name] as status_name
		,[Status].[Id] as Status_id
	  ,[first_type].[Name] as first_types_name
		,[first_type].[Id] as first_types_id
	  ,[Claim_types].[Name] as types_name
		,[Claim_types].[Id] as Types_id
      ,[Claims].[Created_at]
	  ,[Organizations].[Name] as organization_name
		,[Organizations].[Id] as Organization_id
      ,[Claims].[Plan_start_date]
      ,[Claims].[Plan_finish_at]
      ,[Claims].[First_description]
      ,[Claims].[Description]
      ,[Claims].[Priority]
      ,[Claims].[Report_action_id]
	  ,Claims.Fact_finish_at
	  ,Claim_links.Claim1_ID as claims_Id
	  ,Claim_links.Claim_link_type_id as claim_link_types_id
	,Places.Name as places_name
		,Places.Id as places_id
	  ,Diameters.Size
		,Diameters.Id as Diameters_ID
  FROM [dbo].[Claims]
	LEFT JOIN [dbo].[Status] on [Status].[Id] = [Claims].[Status_ID]
	LEFT JOIN [dbo].[Claim_classes] on [Claim_classes].[Id] = [Claims].[Claim_class_ID]
	LEFT JOIN [dbo].[Claim_types] on [Claim_types].[Id] = [Claims].[Claim_type_ID]
	LEFT JOIN [dbo].[Claim_types] as first_type on [first_type].[Id] = [Claims].[Claim_type_ID]
	LEFT JOIN [dbo].[Organizations] on [Organizations].[Id] = [Claims].[Response_organization_ID]
	left join Claim_links on Claim_links.Claim2_ID = Claims.Id
	left join Diameters on Diameters.Id = Claims.Diameters_ID
	left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
	left join Places on Places.Id = Claim_Order_Places.Place_ID
WHERE [Claims].[Id] = @Id
