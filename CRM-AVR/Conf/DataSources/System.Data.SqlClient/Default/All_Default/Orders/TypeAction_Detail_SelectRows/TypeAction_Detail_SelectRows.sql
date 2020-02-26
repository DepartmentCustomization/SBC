--declare @Claim_Id int = 1

SELECT distinct
       Action_type_Place_type.Id
      ,[Action_types].[Id] as action_type_id
      ,[Action_types].[Name]
      ,Place_types.Name as place_type_name
	  ,case when t1.Action_type_id is not null then N'Рекомендована' else '' end as TypeRec
  FROM [dbo].Action_type_Place_type
  left join [Action_types] on Action_type_Place_type.Action_type_Id = Action_types.Id
  left join Place_types on Place_types.Id = Action_type_Place_type.[Place_type_Id]
 -- left join [Claim_type_action_type] on [Claim_type_action_type].Action_type_id = [Action_types].[Id]
  left join (select ctat.Action_type_id from Claims
            left join [Claim_type_action_type] ctat on ctat.Claim_type_id = Claims.Claim_type_ID
            where Claims.id = @Claim_ID) as t1 on t1.Action_type_id = [Action_types].[Id]
WHERE
	 #filter_columns#
     /*#sort_columns#*/
order by case when t1.Action_type_id is not null then N'Рекомендована' else '' end desc
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only