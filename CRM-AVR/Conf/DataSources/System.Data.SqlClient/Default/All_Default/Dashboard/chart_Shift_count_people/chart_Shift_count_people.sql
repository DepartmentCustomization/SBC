select 
	 Shifts.Id
	,Shifts.Name
	,(select count(id) from Shift_Jobs where Shift_Jobs.Shift_ID = Shifts.Id) as count_people
	from Shifts
		left join Teams on Teams.Id = Shifts.Team_ID
	where Shifts.Shift_date = convert(date,getdate())
	and Teams.Organization_ID @Org_Id