SELECT [Actions].[Id]
      ,[Actions].[Claim_ID]
      ,[Actions].[Order_ID]
      ,Orders.Id as orders_id
	  ,[Actions].[Is_Goal]
      ,Action_types.Name as action_types_name
	  ,Action_types.Is_move 
      ,[Actions].[Plan_duration]
      ,[Actions].[Sort_index]
  FROM [dbo].[Actions]
  left join Claims on Claims.Id = Actions.Claim_ID
  left join Orders on Orders.Id = Actions.Order_ID
  left join Action_types on Action_types.Id = Actions.Action_type_ID
WHERE 
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only