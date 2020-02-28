  SELECT 
	  Jobs.Position_ID
	  ,Positions.Name
	  ,count(Position_ID) as Counter
  FROM [CRM_AVR_Analitics].[dbo].[Shifts_Person]

  left join [Jobs] on [Jobs].Id = [Shifts_Person].Job_Id
  left join [Positions] on Positions.Id =  [Jobs].Position_ID

  where [Shifts_Person].Shift_date = convert(date,getdate()) and Jobs.Organization_ID  @Org_Id
  group by Jobs.Position_ID , Positions.Name  