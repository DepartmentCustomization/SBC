select 
    Claim_type_action_type.Id,
    Claim_type_action_type.Claim_type_id,
    Claim_types.Name as Claim_types_name,
    Claim_type_action_type.Action_type_id,
    Action_types.Name as Action_type_name,
    Claim_type_action_type.Sort_index,
    Claim_type_action_type.Plan_duration
from Claim_type_action_type
left join Claim_types on Claim_types.Id = Claim_type_action_type.Claim_type_id
left join Action_types on Action_types.Id = Claim_type_action_type.Action_type_id
where Claim_type_action_type.Claim_type_id = @Claim_type_id
and 	 #filter_columns#
--     #sort_columns#
order by Claim_type_action_type.Sort_index

 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
