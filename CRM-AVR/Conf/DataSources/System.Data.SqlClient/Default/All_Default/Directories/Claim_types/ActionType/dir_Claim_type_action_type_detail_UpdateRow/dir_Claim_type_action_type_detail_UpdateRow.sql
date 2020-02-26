
update [dbo].[Claim_type_action_type]
set Claim_type_id = @Claim_type_id,
    Action_type_id = @Action_type_id,
    Sort_index = isnull(@Sort_index,0),
    Plan_duration = isnull(@Plan_duration,0.0)
where Id = @Id 

