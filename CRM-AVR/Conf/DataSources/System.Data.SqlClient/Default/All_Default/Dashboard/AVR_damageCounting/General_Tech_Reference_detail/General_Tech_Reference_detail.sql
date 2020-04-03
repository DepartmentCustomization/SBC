select  
	row_number() over (order by(select 1)) as num
	,Mechanisms.Id
	,Mechanism_types.Name as mechanisms_type_name
	,Mechanisms.Name  as mechanisms_name
	,Mechanisms.Number
	,org_claim.Name as organizations_name
	,Actions.Start_from as action_date
	,Orders.Id as orders_id
	,Action_types.Name as type_ac_name
	,Contacts.Name as contact_name
	,Places.Name as places_name
	,Places2.Name as places2_name
	,moves.Distanse
	--,'2' as fact_hours_work
	,Actions.Fact_duration
	from Mechanisms
		left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
		--left join Organizations on Organizations.Id = Mechanisms.Organizations_ID
		left join Moves on Moves.Mechanism_ID = Mechanisms.Id
		left join Actions on Actions.Id = Moves.Action_ID
		left join Action_types on Action_types.Id = Actions.Action_type_ID
		left join Orders on Orders.Id = Actions.Order_ID
		left join Shifts on Shifts.Id = Orders.Shift_ID
		left join Shift_Jobs on Shift_Jobs.Shift_ID = Shifts.Id
		left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
		left join Contacts on Contacts.Id = Jobs.Contacts_ID
		left join Places on Places.Id = Moves.Start_place_ID
		left join Places as Places2 on Places2.Id = Moves.Finish_place_ID
		left join Claims on Claims.Id = Orders.Claim_ID
		left join Organizations as org_claim on org_claim.Id = Claims.Response_organization_ID
where Mechanisms.Id = @mech and
Actions.Start_from >= @start_date and Actions.Start_from < @end_date
and Shift_Jobs.Is_driver = 1
