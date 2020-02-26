SELECT [Claim_SwitchOff_Address].[Id]
	  ,Districts.Name as districts_name
      ,Places.Name as places_name
	  ,SwitchOff_types.Name as switch_type
      ,[Claim_SwitchOff_Address].[SwitchOff_start]
      ,[Claim_SwitchOff_Address].[SwitchOff_finish]
	  ,concat( N'Заявка № ',Claims.Claim_Number) as claims_number
	  ,Status.Name as status_name
	  ,Claims.Id as claims_id
  FROM [dbo].[Claim_SwitchOff_Address]
	left join Places on Places.Id = Claim_SwitchOff_Address.Place_ID
	left join Districts on Districts.Id = Places.District_ID
	left join SwitchOff_types on SwitchOff_types.Id = Claim_SwitchOff_Address.SwitchOff_type_id
	left join Claims on Claims.Id = Claim_SwitchOff_Address.Claim_ID
	left join Status on Status.Id = Claims.Status_ID
where [Claim_SwitchOff_Address].[SwitchOff_finish] > getutcdate() 	or
[Claim_SwitchOff_Address].[SwitchOff_finish] is null  and
	#filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only