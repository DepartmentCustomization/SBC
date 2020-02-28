SELECT swOff.[Id]
      ,Places.Name as places_name
	  ,SwitchOff_types.Name as switchoff_type_name
      ,concat('Заявка № ', Claims.Claim_Number) as Claim_Number
      ,Claims.Id as claims_id
      ,swOff.[SwitchOff_start]
      ,swOff.[SwitchOff_finish]
  FROM [dbo].[Claim_SwitchOff_Address] as swOff
		left join Claims on Claims.Id = swOff.Claim_ID
		left join Places on Places.Id = swOff.Place_ID
		left join SwitchOff_types on SwitchOff_types.Id = swOff.SwitchOff_type_id
	WHERE swOff.Claim_ID = (select Appeals.Claim_ID from Appeals where Appeals.Id= @Id)
	and 
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only