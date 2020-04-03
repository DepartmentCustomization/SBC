SELECT Shifts.Id 
	,row_number() over (order by(select 1)) as num
	,Organizations.Name as organizations_name
	,Shifts.Shift_date
	,concat(Shifts.Name,', з: ', cast(Shifts.Plan_start_time as nvarchar(5)) , ' - ', cast(Shifts.Plan_end_time as nvarchar(5))) as shifts
	,Contacts.Name as contact_name
	,case when Mechanisms.Name is not null then Mechanisms.Name
			else 'транспорт незадіян' end as mechnisms_name
	,(select  count(1) as kolvo from Orders as o
					where  o.[Status_ID] = 10 and o.Shift_ID = Shifts.Id and o.Closed_at >= cast(Shifts.Shift_date as datetime)
					and o.Closed_at < dateadd(day,1,cast(Shifts.Shift_date as datetime))) as count_orders
	,(select  count(1) as kol from Actions as act
						left join Orders as ord on ord.Id = act.Order_ID
					where act.Finish_at is not null and ord.Shift_ID = Shifts.Id and act.Finish_at >= cast(Shifts.Shift_date as datetime)
										and act.Finish_at < dateadd(day,1,cast(Shifts.Shift_date as datetime))) as count_actions
	,( select convert(numeric(18,2), sum(DATEDIFF(MINUTE, isnull(Fact_start_time, Plan_start_time), isnull(Fact_end_time, Plan_end_time))*1.00)/60) as time_spells
					   from Shifts as shi
					   where Shift_date < =  convert(nvarchar(13),getutcdate(), 101) and shi.Id= Shifts.Id
					   group by shi.Id ) as hour_spells
	, (select convert(numeric(18,2), sum( DATEDIFF (minute, act3.Start_from, act3.Finish_at)*1.00 )/60) as tim 
					from Actions  as act3
				 		left join Orders as ord3 on ord3.Id = act3.Order_ID
						left join Shifts as shi3 on shi3.Id = ord3.Shift_ID
					where act3.Finish_at is not null and  shi3.Id =Shifts.Id) as effective_hour
	,Organizations.Id as organizations_id
FROM Shifts 
		left join Teams on Teams.Id = Shifts.Team_ID
		left join Organizations on Organizations.Id = Teams.Organization_ID
		left join Shift_Jobs on Shift_Jobs.Shift_ID = Shifts.Id
		left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
		left join Contacts on Contacts.Id = Jobs.Contacts_ID
		left join Mechanisms on Mechanisms.Id = Shifts.Mechanism_ID
	WHERE Shift_Jobs.Is_main = 1
	--	and Organizations.Id = @org_id
		and Shifts.Shift_date > @start_date and Shifts.Shift_date <= @finish_date
		and Contacts.Name like '%'+@name+'%'
	and #filter_columns#
order by Shifts.Shift_date




/*SELECT Shifts.Id
	,row_number() over (order by(select 1)) as num
	,Organizations.Name as organizations_name
	,Shifts.Shift_date
	,concat(Shifts.Name,', з: ', cast(Shifts.Plan_start_time as nvarchar(5)) , ' - ', cast(Shifts.Plan_end_time as nvarchar(5))) as shifts
	,Contacts.Name as contact_name
	,case when Mechanisms.Name is not null  then Mechanisms.Name
			else 'транспорт незадіян' end as mechnisms_name
	,count(distinct Orders.Id) as count_orders
	,count(Actions.Id) as count_actions
	--,sum(  select DATEDIFF(hour,  act.Start_from, act.Finish_at) as time_spells
	--		from Actions as act where act.Finish_at < =  convert(nvarchar(13),getutcdate(), 101) and act.Finish_at is not null) as hour_spells
	,'3,5' as hour_spells
	,'2' as effective_hour
	,Organizations.Id as organizations_id
	
	FROM Shifts 
		left join Teams on Teams.Id = Shifts.Team_ID
		left join Organizations on Organizations.Id = Teams.Organization_ID
		left join Shift_Jobs on Shift_Jobs.Shift_ID = Shifts.Id
		left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
		left join Contacts on Contacts.Id = Jobs.Contacts_ID
		left join Mechanisms on Mechanisms.Id = Shifts.Mechanism_ID
		left join Orders on Orders.Shift_ID = Shifts.Id
		left join Actions on Actions.Order_ID = Orders.Id
		
	WHERE Shift_Jobs.Is_main = 1
	--	and Organizations.Id = @org_id
		and Shifts.Shift_date > @start_date and Shifts.Shift_date <= @finish_date
		and Contacts.Name like '%'+@name+'%'
	and #filter_columns#
		
	GROUP BY Organizations.Name, Shifts.Shift_date,Contacts.Name, 
	        Shifts.Name,Shifts.Plan_start_time ,Shifts.Plan_end_time, Mechanisms.Name, Organizations.Id, Shifts.Id
	        order by Shifts.Shift_date*/