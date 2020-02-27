sELECT Appeals.[Id]
		  ,[Claims].[Claim_Number]
		  ,[Claim_classes].[Name] as classes_name
			,[Claim_classes].[Id] as classes_id
		  ,[Status].[Name] as status_name
			,[Status].[Id] as status_id
		  ,[first_type].[Name] as first_types_name
			,[first_type].[Id] as first_types_id
		  ,[Claim_types].[Name] as types_name
			,[Claim_types].[Id] as types_id
		  ,[Claims].[Created_at]
		  ,[Organizations].[Name] as organization_name
			,[Organizations].[Id] as organization_id
		  ,[Claims].[Plan_start_date]
		  ,[Claims].[Plan_finish_at]
		  ,[Claims].[First_description]
		  ,[Claims].[Description]
		  ,[Claims].[Priority]
		  ,[Claims].[Report_action_id]
		  ,Claims.Fact_finish_at
		  ,Appeals.Contact_ID as contact_id
	  FROM [dbo].Appeals
		left join Claims on Claims.Id = Appeals.Claim_ID
		LEFT JOIN [dbo].[Status] on [Status].[Id] = [Claims].[Status_ID]
		LEFT JOIN [dbo].[Claim_classes] on [Claim_classes].[Id] = [Claims].[Claim_class_ID]
		LEFT JOIN [dbo].[Claim_types] on [Claim_types].[Id] = [Claims].[Claim_type_ID]
		LEFT JOIN [dbo].[Claim_types] as first_type on [first_type].[Id] = [Claims].[Claim_type_ID]
		LEFT JOIN [dbo].[Organizations] on [Organizations].[Id] = [Claims].[Response_organization_ID]
		left join Contacts on Contacts.Id = Appeals.Contact_ID
		left join Organizations org on org.Contacts_ID = Contacts.Id
	WHERE Appeals.[Id] = @Id