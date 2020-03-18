SELECT [Disabling_debtors].[Id]
      ,[Disabling_debtors].[Claim_Id]
      ,Organizations.Name as org_name
		,Organizations.Id as org_id
      ,conWS.Name as employee_name
		,conWS.Id as employee_id
      ,conDebt.Name as debt_name
		,conDebt.Id as debt_id
    --   ,concat(Place_types.Name,': ', placeDebt.Name) as placeDebt_name
        , placeDebt.Name as placeDebt_name
		,placeDebt.Id as placeDebt_id
      ,Flats.Number
      ,Places.Name as placeDis_name
		,Places.Id as placeDis_id
      ,[Disabling_debtors].[Number_seal]
      ,[Disabling_debtors].[Amount_due]
      ,[Disabling_debtors].[Payment_departure]
      ,[Disabling_debtors].[Description]
      ,[Disabling_debtors].[Is_fixed]
  FROM [dbo].[Disabling_debtors]
	left join Organizations on Organizations.Id = Disabling_debtors.OrganizationWS_ID
	left join Contacts conWS on conWS.Id = Disabling_debtors.EmployeeWS_ID
	left join Contacts conDebt on conDebt.Id = Disabling_debtors.Contact_debt
	left join Places placeDebt on placeDebt.Id = Disabling_debtors.Place_debt_Id
	left join Place_types on Place_types.Id = placeDebt.Place_type_ID
	left join Flats on Flats.Id = Disabling_debtors.Flats_debt_Id
	left join Places on Places.Id = Disabling_debtors.Place_disadle_Id
WHERE [Disabling_debtors].Id = @Id
