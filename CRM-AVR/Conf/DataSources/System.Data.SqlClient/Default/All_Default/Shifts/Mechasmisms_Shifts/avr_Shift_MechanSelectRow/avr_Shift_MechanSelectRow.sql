select 
	Shifts.Id
	,Mechanism_types.Name as mechanism_type_name
	,Mechanisms.Name as mechanisms_name
	,Mechanisms.Number as mechanisms_number
	FROM Shifts
	left join Mechanisms on Mechanisms.Id = Shifts.Mechanism_ID
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
where Shifts.Id = @Id