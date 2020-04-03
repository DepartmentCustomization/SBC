SELECT [Action_types].[Id]
      ,[Action_types].[Name]
      ,[Action_types].[Is_move]
  FROM [dbo].[Action_types]
  left join [Claim_type_action_type] on [Claim_type_action_type].Action_type_id = [Action_types].[Id]
WHERE 
[Claim_type_action_type].Claim_type_id = @Claim_type_id
and
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only