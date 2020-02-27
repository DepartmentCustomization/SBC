SELECT Disabling_debtors.[Id]
      ,conWS.Name as [EmployeeWS_ID]
      ,conDebt.Name as [Contact_debt]
      ,concat(Place_types.Name,': ', placeDebt.Name) as [Place_debt_Id]
      ,Flats.Number as [Flats_debt_Id]
      ,Places.Name as [Place_disadle_Id]
    --   ,Disabling_debtors.[Number_seal]
    --   ,Disabling_debtors.[Amount_due]
    --   ,Disabling_debtors.[Payment_departure]
      ,Disabling_debtors.[Is_fixed]
  FROM [dbo].[Disabling_debtors]
	left join Organizations on Organizations.Id = Disabling_debtors.OrganizationWS_ID
	left join Contacts conWS on conWS.Id = Disabling_debtors.EmployeeWS_ID
	left join Contacts conDebt on conDebt.Id = Disabling_debtors.Contact_debt
	left join Places placeDebt on placeDebt.Id = Disabling_debtors.Place_debt_Id
	left join Place_types on Place_types.Id = placeDebt.Place_type_ID
	left join Flats on Flats.Id = Disabling_debtors.Flats_debt_Id
	left join Places on Places.Id = Disabling_debtors.Place_disadle_Id
	where Claim_Id = @claims_id
/*SELECT Disabling_debtors.[Id]
      ,Disabling_debtors.[EmployeeWS_ID]
      ,Disabling_debtors.[Contact_debt]
      ,Disabling_debtors.[Place_debt_Id]
      ,Disabling_debtors.[Flats_debt_Id]
      ,Disabling_debtors.[Place_disadle_Id]
    --   ,Disabling_debtors.[Number_seal]
    --   ,Disabling_debtors.[Amount_due]
    --   ,Disabling_debtors.[Payment_departure]
      ,Disabling_debtors.[Is_fixed]
  FROM [dbo].[Disabling_debtors]
	where Claim_Id = @claims_id*/
	and
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only