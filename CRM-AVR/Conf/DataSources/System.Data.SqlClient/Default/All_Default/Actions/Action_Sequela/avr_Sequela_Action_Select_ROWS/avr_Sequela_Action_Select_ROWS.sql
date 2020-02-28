SELECT [Sequela].[Id]
      ,[Sequela].[Claim_ID]
-- 	  , Action_types.Name as action_name
-- 	  , Action_types.Id as action_id
      ,[Sequela].[Actions_ID]
      ,[Sequela].[Description]
      ,[Sequela].[Created_at]
      ,[Sequela].[Fact_finish_at]
  FROM [dbo].[Sequela]
  where Sequela.Actions_ID = @action_id
  and
	 #filter_columns#
	 #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only