
--declare @dateStart datetime-- = '2021-03-21 00:00:00'
--declare @dateFinish datetime-- = '2021-03-21 00:00:00'

set @dateStart= dateadd(second, 1, @dateStart)
set @dateFinish= dateadd(second, 60*60*24-1, @dateFinish)


 set @dateStart=
 DATEADD(HOUR, DATEDIFF(HOUR,
         CONVERT(datetime, SWITCHOFFSET(@dateStart, DATEPART(TZOFFSET,@dateStart AT TIME ZONE 'E. Europe Standard Time'))),
         @dateStart 
         ), @dateStart)

  set @dateFinish=
 DATEADD(HOUR, DATEDIFF(HOUR,
         CONVERT(datetime, SWITCHOFFSET(@dateFinish, DATEPART(TZOFFSET,@dateFinish AT TIME ZONE 'E. Europe Standard Time'))),
         @dateFinish 
         ), @dateFinish)

 /*new начало*/
 --FORMAT(SwitchOff_start, 'dd.MM.yyyy. hh:mm') SwitchOff_start
 --dbo.fu_out_streetsName_switchOff(cl.Id, sw.Faucet_ID) as switch_places_name

 --отключено в период
 ;with disconnected_during 
 as
 (
 select
		--sw.Id,
		null as row_num
		,cl.[Claim_Number] Claim_ID
		,Places.Name as Adress    
		,dbo.fu_out_streetsName_switchOff(cl.Id, null) as switch_places_name
		,act.Name as action_name
		,case when [is_scheduled_with_warning]='true' then 'x' end as [6]
		,case when [is_scheduled_with_warning]='true' and clt1.Id is not null and clt2.Id is not null then 'x' end as [7]
		,null as [8]
		,case when [is_fault_other]='true' then 'x' end as [9]
		,case when [is_fault_licensee]='true' then 'x' end as [10]
		--,sw.SwitchOff_start
		,FORMAT(sw.SwitchOff_start, 'dd.MM.yyyy. hh:mm') SwitchOff_start
		--,sw.SwitchOff_finish
		,FORMAT(sw.SwitchOff_finish, 'dd.MM.yyyy. hh:mm') SwitchOff_finish
		,null as [13]
		,DATEDIFF(MINUTE, 
		case 
			when sw.SwitchOff_start is null or sw.SwitchOff_start<@dateStart then @dateStart
			else sw.SwitchOff_start end, 
		
		case 
			when sw.SwitchOff_finish is null or sw.SwitchOff_start>@dateFinish then @dateFinish
			else sw.SwitchOff_finish end
		) as [14]
		,dbo.fu_flats_count(cl.Id) as flat_count
		,dbo.[fu_org_ur_count](cl.Id) as ur_count
		,case 
			when [is_fault_other]='true'
				then stuff(isnull(N', '+cont.Name, N'')+ isnull(N', '+cont_f.Name, N''), 1, 2, N'') end as [17]
		,null as [18]
		from Claim_SwitchOff_Address as sw
			left join Claims as cl on cl.Id = sw.Claim_ID
			left join [dbo].[Claim_links] clt1 on cl.Id=clt1.Claim1_ID and clt1.Claim_link_type_id=1
			left join [dbo].[Claim_links] clt2 on cl.Id=clt2.Claim2_ID and clt2.Claim_link_type_id=1
			left join [dbo].[Claim_types] ct on cl.Claim_type_ID=ct.Id
			left join [dbo].[Contacts] cont on cl.Contact_ID=cont.Id
			left join [dbo].[Contacts] cont_f on cl.Contact_ID_Fiz=cont_f.Id
			left join Claim_Order_Places as cop on cop.Claim_ID = cl.Id and cop.Is_first_place=1
			left join Places on Places.Id = cop.Place_ID
			left join (SELECT * FROM (SELECT *, ROW_NUMBER() OVER (PARTITION BY Claim_ID ORDER BY is_goal desc, Plan_start_date DESC) rank
									FROM Actions) a
							WHERE  a.rank = 1 ) as Actions
			on Actions.Claim_ID = cl.Id
			left join Action_type_Place_type as atpt on atpt.Id = Actions.Action_type_ID
			left join Action_types act on act.Id = atpt.Action_type_Id
		where   
		--cast(sw.SwitchOff_start as date) >= @dateStart 
		--and cast(sw.SwitchOff_finish as date) <= @dateFinish
		 sw.[SwitchOff_start] between @dateStart and @dateFinish
 )
 -- включен в период
, included_in_period as 
 (select
	distinct
	--sw.Id,
	null as row_num
    ,cl.[Claim_Number] Claim_ID
	,Places.Name as Adress    
	--,switch_places_name.[name] as [switch_places_name]
	,dbo.fu_out_streetsName_switchOff(cl.Id, null) as switch_places_name
	,act.Name as action_name
	,case when [is_scheduled_with_warning]='true' then 'x' end as [6]
	,case when [is_scheduled_with_warning]='true' and clt1.Id is not null and clt2.Id is not null then 'x' end as [7]
	,null as [8]
	,case when [is_fault_other]='true' then 'x' end as [9]
	,case when [is_fault_licensee]='true' then 'x' end as [10]
	--,sw.SwitchOff_start
		,FORMAT(sw.SwitchOff_start, 'dd.MM.yyyy. hh:mm') SwitchOff_start
		--,sw.SwitchOff_finish
		,FORMAT(sw.SwitchOff_finish, 'dd.MM.yyyy. hh:mm') SwitchOff_finish
	,null as [13]
	--,DATEDIFF(MINUTE, @dateStart, isnull(sw.SwitchOff_finish, @dateFinish )) as [14]
	,DATEDIFF(MINUTE, 
		case 
			when sw.SwitchOff_start is null or sw.SwitchOff_start<@dateStart then @dateStart
			else sw.SwitchOff_start end, 
		
		case 
			when sw.SwitchOff_finish is null or sw.SwitchOff_start>@dateFinish then @dateFinish
			else sw.SwitchOff_finish end
		) as [14]
	,dbo.fu_flats_count(cl.Id) as flat_count
	--,null as flat_count
	,dbo.[fu_org_ur_count](cl.Id)  as ur_count
	,case 
			when [is_fault_other]='true'
				then stuff(isnull(N', '+cont.Name, N'')+ isnull(N', '+cont_f.Name, N''), 1, 2, N'') end as [17]
	,null as [18]
	from Claim_SwitchOff_Address as sw
		left join Claims as cl on cl.Id = sw.Claim_ID 
		left join [dbo].[Claim_links] clt1 on cl.Id=clt1.Claim1_ID
		left join [dbo].[Claim_links] clt2 on cl.Id=clt2.Claim2_ID
		left join [dbo].[Claim_types] ct on cl.Claim_type_ID=ct.Id
		left join [dbo].[Contacts] cont on cl.Contact_ID=cont.Id
		left join [dbo].[Contacts] cont_f on cl.Contact_ID_Fiz=cont_f.Id
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
	--cast(sw.SwitchOff_start as date) < @dateStart 
	--and ( (cast(sw.SwitchOff_finish as date) >= @dateStart and cast(sw.SwitchOff_finish as date) <=  @dateFinish ) or sw.SwitchOff_finish is null )

	sw.[SwitchOff_finish] between @dateStart and @dateFinish
	or sw.[SwitchOff_finish] is null
	)
, total as (
 select *
 from disconnected_during
 union
 select *
 from included_in_period
)

 select ROW_NUMBER() over(order by Claim_ID) as row_num
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
		,ltrim(round((convert(float, [14])/60.00),1))+N' годин ('+ltrim([14])+N' хвилин)' [14]
		,flat_count
		,ur_count
		,[17]
		,[18]
from total t

 /*new конец*/

 /*
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
	*/