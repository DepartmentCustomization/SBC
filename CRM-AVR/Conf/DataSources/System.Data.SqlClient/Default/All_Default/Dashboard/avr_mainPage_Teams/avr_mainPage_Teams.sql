SELECT
    Shifts.Id
    ,Shifts.Name
    ,ct.Name as pib
    ,Jobs.Job_name
FROM  Shifts
    left join Teams on Shifts.Team_ID = Teams.Id
    left join Shift_Jobs as sj on sj.Shift_ID = Shifts.Id
    left join Jobs on Jobs.Id = sj.Job_ID
    left join Contacts as ct on ct.Id = Jobs.Contacts_ID
    -- left join Organizations as org on org.Id = Teams.Organization_ID
WHERE Teams.Organization_ID @OrgId
    and Shifts.Shift_date >= convert(date,getdate())
	and #filter_columns#
		#sort_columns#