if (select count(Faucet.Claim_Id) as coun 
	from Faucet
	where Claim_Id =  @claim_ID
	and Action_types_Id in (231, 48, 232, 151)
	and Finish_at is null
	) >= 1
begin
	select 1 as Result
	-- 	 set @res = 'Yes'
end 
	else
begin
	select 0 as Result
	-- 	set @res = 'No'
end


/*if (select count(Claims.Id) as coun 
	from Claims 
		left join Actions on Actions.Claim_ID = Claims.Id
		left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID
		left join Action_types on Action_types.Id = atpt.Action_type_Id
	where Claims.Id = @claim_ID and Action_types.Id in (233, 48, 232) -- (40, 42)
	) >= 1
begin
	select 1 as Result
	-- 	 set @res = 'Yes'
end 
	else
begin
	select 0 as Result
	-- 	set @res = 'No'
end*/