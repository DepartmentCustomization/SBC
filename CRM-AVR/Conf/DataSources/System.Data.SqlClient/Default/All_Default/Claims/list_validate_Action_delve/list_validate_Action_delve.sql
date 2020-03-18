if(
	select sum(isnull(IsError,0)) as IsError from (
		select case when isnull(t1.val,0) != isnull(t2.val,0) then 1 else 0 end as IsError 
		from 
		(select Actions.Claim_ID,  count(Claim_ID) as val	from Actions
			left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID
			left join Action_types on Action_types.Id = atpt.Action_type_Id
-- 		where Claim_ID = @claim_ID and Action_types.Id in (227,228,229,230,231,232,233) and Do_not != 1 group by Actions.Claim_ID
		where Claim_ID = @claim_ID and Action_types.Id in (120,121,122,124,125,126,127,128,129,381,382,383,384,385,386) and Do_not != 1 group by Actions.Claim_ID
		) as t1
	full outer join   
		(select  Actions.Claim_ID, count(Claim_ID) as val	from Actions
			left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID
			left join Action_types on Action_types.Id = atpt.Action_type_Id
-- 		where Claim_ID = @claim_ID and Action_types.Id in (118,119) and Do_not != 1 group by Actions.Claim_ID
		where Claim_ID = @claim_ID and Action_types.Id in (57,58,59,60,61,62,296,297,298) and Do_not != 1 group by Actions.Claim_ID
		) as t2 on t2.Claim_ID = t1.Claim_ID where t2.Claim_ID is null or t1.Claim_ID is null
	) as t3
) > 0
begin
	select 1 as Result
 	 --set @res = 'Error'
	
end 
else
begin
	select 0 as Result
 	--set @res = 'Good'
end 