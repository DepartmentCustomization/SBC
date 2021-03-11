SELECT Claim_SwitchOff_Address.Id, 
  Claim_SwitchOff_Address.[SwitchOff_start],
  [Claim_SwitchOff_Address].[SwitchOff_finish],
  SwitchOff_types.[Name] SwitchOff_type_Name,
  Places.Name as Place_Name

  FROM [Claim_SwitchOff_Address]
  left join [SwitchOff_types] on [SwitchOff_types].[Id] = [Claim_SwitchOff_Address].[SwitchOff_type_id]
  left join Places on Places.Id = Claim_SwitchOff_Address.Place_ID
  where Claim_SwitchOff_Address.[Claim_ID] = @claim_id 