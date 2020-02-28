-- declare @claim_id int = 6967
-- declare @dateStart datetime = '2019-11-05'
-- declare @dateFinish datetime = getdate()

--отключен в период
;with disconnected_during 
	as (
	select
		distinct
		null as row_num
		,sw.Claim_ID
		,Places.Name as Adress    
		,dbo.fu_out_streetsName_switchOff(cl.Id, sw.Faucet_ID) as switch_places_name
		,act.Name as action_name
		,null as [6]
		,null as [7]
		,null as [8]
		,null as [9]
		,null as [10]
		,sw.SwitchOff_start
		,sw.SwitchOff_finish
		,null as [13]
		,DATEDIFF(MINUTE, sw.SwitchOff_start, sw.SwitchOff_finish) as [14]
		,dbo.fu_flats_count(cl.Id) as flat_count
		--,null as flat_count
		,dbo.[fu_org_ur_count](cl.Id) as ur_count
		,null as [17]
		,null as [18]
		from Claim_SwitchOff_Address as sw
			left join Claims as cl on cl.Id = sw.Claim_ID
			left join Claim_Order_Places as cop on cop.Claim_ID = cl.Id and cop.Is_first_place=1
			left join Places on Places.Id = cop.Place_ID
			--left join Actions on Actions.Claim_ID = cl.Id and Actions.Is_Goal = 1
			left join (SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY Claim_ID ORDER BY is_goal desc, Plan_start_date DESC) rank
									FROM Actions) a
							WHERE  a.rank = 1 ) as Actions
			on Actions.Claim_ID = cl.Id
			left join Action_type_Place_type as atpt on atpt.Id = Actions.Action_type_ID
			left join Action_types act on act.Id = atpt.Action_type_Id
		where   
		cast(sw.SwitchOff_start as date) >= @dateStart 
		--and sw.SwitchOff_finish is null
		and cast(sw.SwitchOff_finish as date) <= @dateFinish
	)
	--select * from disconnected_during

-- отключен до периода
, included_before_period as 
 (select
	distinct
	null as row_num
    ,sw.Claim_ID
	,Places.Name as Adress    
	--,switch_places_name.[name] as [switch_places_name]
	,dbo.fu_out_streetsName_switchOff(cl.Id, sw.Faucet_ID) as switch_places_name
	,act.Name as action_name
	,null as [6]
	,null as [7]
	,null as [8]
	,null as [9]
	,null as [10]
	,sw.SwitchOff_start
	,sw.SwitchOff_finish
	,null as [13]
	,DATEDIFF(MINUTE, @dateStart, isnull(sw.SwitchOff_finish, @dateFinish )) as [14]
	,dbo.fu_flats_count(cl.Id) as flat_count
	--,null as flat_count
	,dbo.[fu_org_ur_count](cl.Id)  as ur_count
	,null as [17]
	,null as [18]
	from Claim_SwitchOff_Address as sw
		left join Claims as cl on cl.Id = sw.Claim_ID
		left join Claim_Order_Places as cop on cop.Claim_ID = cl.Id and cop.Is_first_place=1
		left join Places on Places.Id = cop.Place_ID
	    --left join Actions on Actions.Claim_ID = cl.Id and Actions.Is_Goal = 1
		left join (SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY Claim_ID ORDER BY is_goal desc, Plan_start_date DESC) rank
									FROM Actions) a
							WHERE  a.rank = 1 ) as Actions
			on Actions.Claim_ID = cl.Id
	    left join Action_type_Place_type as atpt on atpt.Id = Actions.Action_type_ID
	    left join Action_types act on act.Id = atpt.Action_type_Id
	where   
	cast(sw.SwitchOff_start as date) < @dateStart 
	and ( (cast(sw.SwitchOff_finish as date) >= @dateStart and cast(sw.SwitchOff_finish as date) <=  @dateFinish ) or sw.SwitchOff_finish is null )

	)
	--select * from included_before_period

	--выключен в период
,off_during as 
	(select
		distinct
		null as row_num
		,sw.Claim_ID
		,Places.Name as Adress    
		--,switch_places_name.[name] as [switch_places_name]
		,dbo.fu_out_streetsName_switchOff(cl.Id, sw.Faucet_ID) as switch_places_name
		,act.Name as action_name
		,null as [6]
		,null as [7]
		,null as [8]
		,null as [9]
		,null as [10]
		,sw.SwitchOff_start
		,sw.SwitchOff_finish
		,null as [13]
		,DATEDIFF(MINUTE, sw.SwitchOff_start, @dateFinish) as [14]
		,dbo.fu_flats_count(cl.Id) as flat_count
		--,null as flat_count
		,dbo.[fu_org_ur_count](cl.Id)  as ur_count
		,null as [17]
		,null as [18]
	from Claim_SwitchOff_Address as sw
		left join Claims as cl on cl.Id = sw.Claim_ID
		left join Claim_Order_Places as cop on cop.Claim_ID = cl.Id and cop.Is_first_place=1
		left join Places on Places.Id = cop.Place_ID
	    --left join Actions on Actions.Claim_ID = cl.Id and Actions.Is_Goal = 1
		left join (SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY Claim_ID ORDER BY is_goal desc, Plan_start_date DESC) rank
									FROM Actions) a
							WHERE  a.rank = 1 ) as Actions
			on Actions.Claim_ID = cl.Id
	    left join Action_type_Place_type as atpt on atpt.Id = Actions.Action_type_ID
	    left join Action_types act on act.Id = atpt.Action_type_Id
	where   
	cast(sw.SwitchOff_start as date) >= @dateStart 
	and (cast(sw.SwitchOff_finish as date) > @dateFinish or sw.SwitchOff_finish is null)

	)
	--select * from off_during

,total as
	(
	select * from disconnected_during
	union all
	select * from  included_before_period
	union all
	select * from  off_during
	)




select 
	ROW_NUMBER() over(order by Claim_ID) as row_num
    ,Claim_ID
	,Adress
	,switch_places_name
	,action_name
	,[6]
	,[7]
	,[8]
	,[9]
	,[10]
	,SwitchOff_start
	,SwitchOff_finish
	,[13]
	,[14]
	,flat_count
	,ur_count
	,[17]
	,[18]
 from total
order by Claim_ID
	