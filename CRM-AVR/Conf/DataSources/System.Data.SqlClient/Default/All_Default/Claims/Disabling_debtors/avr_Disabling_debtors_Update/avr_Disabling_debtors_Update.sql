UPDATE [dbo].[Disabling_debtors]
   SET [OrganizationWS_ID] = @org_id
      ,[EmployeeWS_ID] = @employee_id
      ,[Contact_debt] = @debt_id
      ,[Place_debt_Id] = @placeDebt_id
      ,[Flats_debt_Id] = @Number
      ,[Place_disadle_Id] = @placeDis_id
      ,[Number_seal] = @Number_seal
      ,[Amount_due] = @Amount_due
      ,[Payment_departure] = @Payment_departure
      ,[Description] = @Description
      ,[Is_fixed] = @Is_fixed
 WHERE Id = @Id
