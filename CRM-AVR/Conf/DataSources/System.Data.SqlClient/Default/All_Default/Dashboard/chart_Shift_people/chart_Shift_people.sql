select 
	Shifts.Id
	,Shifts.name as shifts_name
	,Shifts.Shift_date
	,Contacts.Name as fio
	,Jobs.Job_name
	,Shift_Jobs.Is_main
	,Shift_Jobs.Is_driver
	from Shifts
		left join Shift_Jobs on Shift_Jobs.Shift_ID = Shifts.Id
		left join Jobs on Jobs.Id= Shift_Jobs.Job_ID
		left join Contacts on Contacts.Id = Jobs.Contacts_ID
	where Shifts.Id = @Id