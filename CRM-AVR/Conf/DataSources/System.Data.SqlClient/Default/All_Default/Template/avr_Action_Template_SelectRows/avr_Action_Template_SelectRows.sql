SELECT 
    Action_types.Id as types_id
    ,[Actions].[Id]
    ,Action_types.Name as action_types_name
    ,Places.Name
	,Actions.Sort_index
  FROM [dbo].[Actions]
  left join Claims on Claims.Id = Actions.Claim_ID
  left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID
  left join Action_types on Action_types.Id = atpt.Action_type_Id
  left join Places on Places.Id = Actions.Place_ID
WHERE Claims.Id= @Id
and
	 #filter_columns#
	 #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only