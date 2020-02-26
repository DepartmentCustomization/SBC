
SELECT 
	row_number() over (order by(select 1)) as num
	,Organizations.Name as organization_name
	,Contacts.Name as contact_name

	,(select convert(numeric(18,2), sum(DATEDIFF(MINUTE, isnull(shi.Fact_start_time, shi.Plan_start_time), isnull(shi.Fact_end_time, shi.Plan_end_time))*1.00)/60) as time_spells
					   from Shifts as shi
						left join Shift_Jobs as sh_j on sh_j.Shift_ID = shi.Id
					   where shi.Shift_date < =  convert(nvarchar(13),getutcdate(), 101) and sh_j.Job_ID= Jobs.Id
					  ) as hours_work

	,(select convert(numeric(18,2), sum(DATEDIFF (minute, act3.Start_from, act3.Finish_at)*1.00 )/60) as tim 
					from Actions  as act3
				 		left join Orders as ord3 on ord3.Id = act3.Order_ID
						left join Shifts as shi3 on shi3.Id = ord3.Shift_ID
						left join Shift_Jobs as sh_j2 on sh_j2.Shift_ID = shi3.Id
					where act3.Finish_at is not null and  sh_j2.Job_ID = Jobs.Id) as effective_hour	

	,(select  count(1) as kolvo from Orders as o
						left join Shifts as shi4 on shi4.Id = o.Shift_ID
						left join Shift_Jobs as sh_j4 on sh_j4.Shift_ID = shi4.Id
					where  o.[Status_ID] = 10 and sh_j4.Job_ID = Jobs.Id 
					and o.Closed_at >= @start_date --cast(Shifts.Shift_date as datetime)
					and o.Closed_at <  @finish_date --dateadd(day,1,cast(Shifts.Shift_date as datetime))
					) as count_orders

	,(select isnull(sum(Moves.Distanse),0) as dist
						from Moves
						left join Actions on Actions.Id = Moves.Action_ID
						left join Orders as o on o.Id = Actions.Order_ID
						left join Shifts as shi5 on shi5.Id = o.Shift_ID
						left join Shift_Jobs as sh_j5 on sh_j5.Shift_ID = shi5.Id
					where sh_j5.Is_driver =1 and sh_j5.Job_ID = Jobs.Id
					and Actions.Start_from >= @start_date 
					and Actions.Finish_at <  @finish_date 
					) as distans
	,Organizations.Id as organizations_id
	,Jobs.Id
	FROM Jobs
		left join Contacts on Contacts.Id = Jobs.Contacts_ID
		left join Organizations on Organizations.Id = Jobs.Organization_ID
		left join Shift_Jobs on Shift_Jobs.Job_ID = Jobs.Id
		left join Shifts on Shifts.Id = Shift_Jobs.Shift_ID
	WHERE Shift_Jobs.Id is not null
		  and Shifts.Shift_date > @start_date and Shifts.Shift_date <= @finish_date
		  and Contacts.Name like '%'+@name+'%'
	    and #filter_columns#
	GROUP BY Organizations.Name, Contacts.Name, Jobs.Id, Organizations.Id