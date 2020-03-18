
SELECT [Claim_types].[Id]
     ,[Claim2_types].[Full_Name] as claim_types_name_first
      ,[Claim2_types].[Id] as claim_types_id_first
	  ,[Claim_classes].[Name] as classes_name
		,Claim_classes.[Id] as classes_id
      ,[Claim_types].[Name] as claim_types_name
      ,[Claim_types].[Priority]
      ,[Claim_types].[Is_diameter_required]
      ,[Claim_types].[Sort_index]
	  ,[TypeAccess].[Name] as access_name
		,[TypeAccess].[Id] as access_id
		,Claim_types.[Full_Name]
		,Claim_types.Is_delete
  FROM [dbo].[Claim_types]
left join [dbo].[TypeAccess] on [TypeAccess].[Id] = [Claim_types].[TypeAccess_ID]
left join [dbo].[Claim_classes] on Claim_classes.Id = Claim_class_ID
left join Claim_types Claim2_types on Claim2_types.Id = Claim_types.Parent_сlaim_types_ID
WHERE Claim_types.Id = @Id