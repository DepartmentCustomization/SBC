SELECT [Claim_links].[Id]
     -- ,Claims.Claim_Number as claims_number1 ,Claims2.Claim_Number as claims_number2
	  ,Claim_link_types.Name as claim_link_types_name
		,Claim_link_types.Id as claim_link_types_id
    -- ,[Claim_links].Claim1_ID as claims_number1
     ,[Claim_links].Claim2_ID as claims_number2
     ,Claims.Id  as claims_Id
	 
  FROM [dbo].[Claim_links]
	left join Claims on Claims.Id = [Claim_links].Claim1_ID and Claims.Id = [Claim_links].Claim2_ID
	left join Claim_link_types on Claim_link_types.Id = Claim_links.Claim_link_type_id
--	left join Claims Claims2 on Claims2.Id = Claim_links.Claim2_ID
WHERE Claim_links.Id = @Id