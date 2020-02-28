select  distinct
	row_number() over (order by(select 1)) as num
	,Mechanisms.Id
	,Mechanism_types.Name as mechanisms_type_name
	,Mechanisms.Name  as mechanisms_name
	,Mechanisms.Number
	,Organizations.Name as organizations_name
	,sum(moves.Distanse) as distance
	,count(Orders.Id) as count_orders
	,count (distinct Maintenance.Id) as service
	,DATEDIFF(DAY, Maintenance.Start_at,Maintenance.Finished_at) as not_work_day
FROM Mechanisms
		left join Maintenance on Maintenance.MechanismsID = Mechanisms.Id
		left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
		left join Organizations on Organizations.Id = Mechanisms.Organizations_ID
		left join Moves on Moves.Mechanism_ID = Mechanisms.Id
		left join Actions on Actions.Id = Moves.Action_ID
		left join Action_types on Action_types.Id = Actions.Action_type_ID
		left join Orders on Orders.Id = Actions.Order_ID
WHERE  Organizations.Id = @org_id and
 Actions.Start_from >= @start_date and Actions.Start_from < @end_date
group by Mechanisms.Id, Mechanism_types.Name, Mechanisms.Name, Mechanisms.Number, Maintenance.Start_at, Maintenance.Finished_at, Organizations.Name

/*select distinct
    row_number() over (order by(select 1)) as num
	, Mechanism_types.Name as mechanisms_type_name
	,Mechanisms.Name  as mechanisms_name
	,Mechanisms.Number
	,Organizations.Name as organizations_name
	,'Паньков С.В.; Харченко В.Р.' as driver_name
	,sum(moves.Distanse) as distance
	,count(Orders.Id) as count_orders
	--,Orders.Id
	,'12' as service
	,'2' as not_work_day
	from Mechanisms
		left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
		left join Organizations on Organizations.Id = Mechanisms.Organizations_ID
		left join Shifts on Shifts.Mechanism_ID = Mechanisms.Id
		left join Shift_Jobs on Shift_Jobs.Shift_ID = Shifts.Id
		left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
		left join Moves on Moves.Mechanism_ID = Mechanisms.Id
		left join Actions on Actions.Id = Moves.Action_ID
		left join Orders on Orders.Id = Actions.Order_ID
where  Organizations.Id = @org_id
group by Mechanisms.Name, Mechanisms.Number, Organizations.Name, Mechanism_types.Name
*/