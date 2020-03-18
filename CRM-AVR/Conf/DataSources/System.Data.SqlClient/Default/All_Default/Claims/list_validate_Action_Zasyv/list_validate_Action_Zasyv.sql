
if exists (select * from Faucet where Claim_Id = @claim_ID and Start_from is not null and Finish_at is null )
begin
	select 0 as Result
-- 	 set @res = 'Bad'	
end 
else
begin
	select 1 as Result
-- 	set @res = 'Good'
end 

/*
if(
	select sum(isnull(IsError,0)) as IsError from (
		select case when isnull(t1.val,0) != isnull(t2.val,0) then 1 else 0 end as IsError 
		from 
		(select Diameters_ID, sum(Value) as val	from Actions
			left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID
			left join Action_types on Action_types.Id = atpt.Action_type_Id
-- 		where Claim_ID = @claim_ID and Action_types.Id in (40,42,41) and Do_not != 1 group by  Action_types.Id, Diameters_ID
		where Claim_ID = @claim_ID and Action_types.Id in (233,231,48,232) and Do_not != 1 group by  Action_types.Id, Diameters_ID
		) as t1
	full outer join   
		(select Diameters_ID, sum(Value) as val	
			from Actions
			left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID
			left join Action_types on Action_types.Id = atpt.Action_type_Id
-- 		where Claim_ID = @claim_ID and Action_types.Id in (173,175,174) and Do_not != 1	group by  Action_types.Id, Diameters_ID
		where Claim_ID = @claim_ID and Action_types.Id in (10,149,150,151) and Do_not != 1	group by  Action_types.Id, Diameters_ID
		) as t2 on t2.Diameters_ID = t1.Diameters_ID where t2.Diameters_ID is null or t1.Diameters_ID is null
	) as t3
) > 0
begin
	select 1 as Result
-- 	 set @res = 'Error'
	
end 
else
begin
	select 0 as Result
-- 	set @res = 'Good'
	
end 

-- select @res
*/