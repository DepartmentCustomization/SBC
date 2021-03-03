SELECT [Faucet].Id, Action_types.Name Action_type_Name
  ,[Start_from]
  ,[Finish_at]
  ,Diameters.Size Diameter_size
  ,Places.Name as [Place_Name]
  ,case when Claim_SwitchOff_Address.id is not null then 1 else 0 end has_SwitchOff
  FROM [Faucet]
  left join [Action_types] on [Action_types].Id = [Action_types_Id]
  left join Diameters on Diameters.Id = [Faucet].[Diametr_Id] 
  left join Places on Places.Id = [Faucet].[Place_Id]
  left join Claim_SwitchOff_Address on [Claim_SwitchOff_Address].[Faucet_ID] = Faucet.Id 
  where Faucet.[Claim_Id] = @claim_id

  group by [Faucet].Id, Action_types.Name 
  ,[Start_from]
  ,[Finish_at]
  ,Diameters.Size 
  ,Places.Name
  ,case when Claim_SwitchOff_Address.id is not null then 1 else 0 end
