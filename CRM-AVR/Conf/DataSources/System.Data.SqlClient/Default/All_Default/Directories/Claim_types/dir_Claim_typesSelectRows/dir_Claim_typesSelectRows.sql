SELECT [Claim_types].[Id]
      ,[Claim_classes].[Name] as classes_name
      ,[Claim_types].[Name] as claim_types_name
      ,Claim2_types.[Name] as claim_types_name_first
      ,[Claim_types].[Priority]
	  ,[TypeAccess].[Name] as type_acess_name
	  ,Claim2_types.Id as claim2_types_id
  FROM [dbo].[Claim_types]
left join [dbo].[TypeAccess] on [TypeAccess].[Id] = [Claim_types].[TypeAccess_ID]
left join [dbo].[Claim_classes] on Claim_classes.Id = Claim_class_ID 
left join Claim_types Claim2_types on Claim2_types.Id = Claim_types.Parent_сlaim_types_ID
  
  WHERE Claim_types.TypeAccess_ID !=100
  and Claim_types.Is_delete != 1
  and
     #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only