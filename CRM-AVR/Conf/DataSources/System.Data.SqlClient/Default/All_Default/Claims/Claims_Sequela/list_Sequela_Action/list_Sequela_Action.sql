select 
	Actions.Id
   ,Action_types.Name
FROM Actions
left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID
left join Action_types on Action_types.Id = atpt.Action_type_Id
	where Claim_ID = @Claim_id
	 and
	 #filter_columns#
	 #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only