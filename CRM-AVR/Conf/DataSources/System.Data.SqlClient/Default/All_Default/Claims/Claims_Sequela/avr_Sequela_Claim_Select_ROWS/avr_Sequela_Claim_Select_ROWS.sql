SELECT [Sequela].[Id]
      ,[Sequela].[Claim_ID]
	  , Action_types.Name as action_name
-- 	  , Action_types.Id as action_id
      ,[Sequela].[Actions_ID]
      ,[Sequela].[Description]
      ,cast([Sequela].[Created_at] as date) as [Created_at]
      ,cast([Sequela].[Fact_finish_at] as date) as [Fact_finish_at]
  FROM [dbo].[Sequela]
    left join Actions on Actions.Id = Sequela.Actions_ID
	left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID
	left join Action_types on Action_types.Id = atpt.Action_type_Id
  where Sequela.Claim_ID = @Claim_id
  and
	 #filter_columns#
	 #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only