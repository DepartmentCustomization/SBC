SELECT swOff.[Id]
      ,Places.Name as places_name
		,Places.Id as places_id
	  ,SwitchOff_types.Name as switchoff_type_name
		,SwitchOff_types.Id as switchoff_type_id
      ,swOff.[Claim_ID]
      ,swOff.[SwitchOff_start]
      ,swOff.[SwitchOff_finish] as finish_at
      --,Claims.Fact_finish_at
  FROM [dbo].[Claim_SwitchOff_Address] as swOff
		left join Claims on Claims.Id = swOff.Claim_ID
		left join Places on Places.Id = swOff.Place_ID
		left join SwitchOff_types on SwitchOff_types.Id = swOff.SwitchOff_type_id
	WHERE swOff.Id = @Id