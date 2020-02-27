

INSERT INTO [dbo].[Claim_type_action_type]
           (Claim_type_id,
		   Action_type_id,
		   Sort_index,
		   Plan_duration)
        output [inserted].[Id]
     VALUES
           (
		    @Claim_type_id,
		    @Action_type_id,
		   isnull(@Sort_index,0),
		   isnull(@Plan_duration,0)
		   )
