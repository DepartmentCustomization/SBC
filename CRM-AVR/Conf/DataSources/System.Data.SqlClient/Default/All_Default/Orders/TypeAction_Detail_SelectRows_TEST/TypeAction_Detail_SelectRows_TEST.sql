--declare @Claim_Id int = 1

SELECT distinct [Action_types].[Id]
      ,[Action_types].[Name]
      ,[Action_types].[Is_move]
	  ,case when t1.Action_type_id is not null then N'Рекомендована' else '' end as TypeRec

  FROM [dbo].[Action_types]
  left join [Claim_type_action_type] on [Claim_type_action_type].Action_type_id = [Action_types].[Id]
  left join (select [Claim_type_action_type].Action_type_id from Claims
  left join [Claim_type_action_type] on [Claim_type_action_type].Claim_type_id = Claims.Claim_type_ID
where Claims.id = @Claim_Id) as t1 on t1.Action_type_id = [Action_types].[Id]
WHERE
	 #filter_columns#
     /*#sort_columns#*/
order by case when t1.Action_type_id is not null then N'Рекомендована' else '' end desc, 
 [Action_types].[Id]
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only