SELECT [Claims].[Id]
	  ,[Claim_types].[Name] as types_name
		,[Claim_types].[Id] as types_id
	 ,Claim_classes.Name as classes_name
		,Claim_classes.Id as classes_id
	  ,[Organizations].[Name] as organization_name
		,[Organizations].[Id] as organization_id
      ,[Claims].[Description]
	  ,Place_types.Name as place_type_name
		,Place_types.Id as place_type_id
	  ,Places.Name as places_name
		,Places.Id as places_id
	  ,Diameters.Size
		--,Diameters.Id as Diameters_ID
		,Claims.Diameters_ID
	,Claims.Is_Template
	,[Claims].[Id] as temp_id
	,Contacts.Name as contact_name
		,Claims.Contact_ID as contact_id

  FROM [dbo].[Claims]
	LEFT JOIN [Claim_types] on [Claim_types].[Id] = [Claims].[Claim_type_ID]
	left join Claim_classes on Claim_classes.Id = Claims.Claim_class_ID
	LEFT JOIN [Organizations] on [Organizations].[Id] = [Claims].[Response_organization_ID]
	left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
	left join Places on Places.Id = Claim_Order_Places.Place_ID
	left join Place_types on Place_types.Id = Places.Place_type_ID
	left join Diameters on Diameters.Id = Claims.Diameters_ID
	left join Contacts on Contacts.Id = Claims.Contact_ID
WHERE [Claims].[Id] = @Id and Claim_Order_Places.Is_first_place <>0


-- SELECT [Claims].[Id]
--       ,[Claims].[Id] as claims_id
--       ,[Claims].[Claim_Number]
-- 	  ,[Claim_classes].[Name] as classes_name
-- 		,[Claim_classes].[Id] as classes_id
-- 	  ,[Status].[Name] as status_name
-- 		,[Status].[Id] as status_id
-- 	  ,[first_type].[Name] as first_types_name
-- 		,[first_type].[Id] as first_types_id
-- 	  ,[Claim_types].[Name] as types_name
-- 		,[Claim_types].[Id] as types_id
--       ,[Claims].[Created_at]
-- 	  ,[Organizations].[Name] as organization_name
-- 		,[Organizations].[Id] as organization_id
--       ,[Claims].[Plan_start_date]
--       ,[Claims].[Plan_finish_at]
--       ,[Claims].[First_description]
--       ,[Claims].[Description]
--       ,[Claims].[Priority]
--       ,[Claims].[Report_action_id]
-- 	  ,Claims.Fact_finish_at
-- 	  ,Places.Name as places_name
-- 		,Places.Id as places_id
-- 		,Diameters.Size
-- 		,Diameters.Id as Diameters_ID
-- 	,isnull((select count(Id) from Orders where Orders.Claim_ID = @Id),0) as count_orders
-- 	,Claims.Is_Template
--   FROM [dbo].[Claims]
-- 	LEFT JOIN [dbo].[Status] on [Status].[Id] = [Claims].[Status_ID]
-- 	LEFT JOIN [dbo].[Claim_classes] on [Claim_classes].[Id] = [Claims].[Claim_class_ID]
-- 	LEFT JOIN [dbo].[Claim_types] on [Claim_types].[Id] = [Claims].[Claim_type_ID]
-- 	LEFT JOIN [dbo].[Claim_types] as first_type on [first_type].[Id] = [Claims].[Claim_type_ID]
-- 	LEFT JOIN [dbo].[Organizations] on [Organizations].[Id] = [Claims].[Response_organization_ID]
-- 	left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
-- 	left join Places on Places.Id = Claim_Order_Places.Place_ID
-- 	left join Diameters on Diameters.Id = Claims.Diameters_ID
-- WHERE [Claims].[Id] = @Id and Claim_Order_Places.Is_first_place <>0