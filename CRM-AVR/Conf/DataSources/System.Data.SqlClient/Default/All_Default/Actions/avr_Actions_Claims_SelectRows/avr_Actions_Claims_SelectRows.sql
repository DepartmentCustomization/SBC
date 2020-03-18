select [Id]
      ,[Claim_ID]
      ,[Order_ID]
      ,ranks
      ,orders_id
	  ,[Is_Goal]
      ,action_types_name
      ,Diameters_ID
	  ,[Value]
	  ,[Sort_index]
	from actions_view    -- view
where [Claim_ID]= @Id
and
#filter_columns#
order by Order_ID, [Sort_index]
	 
-- 	 order by Orders.Id
    -- #sort_columns# 
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
/*
SELECT [Actions].[Id]
      ,[Actions].[Claim_ID]
      ,[Actions].[Order_ID]
      ,DENSE_RANK () over(partition by [Actions].[Claim_ID] order by [Actions].[Order_ID]  asc) as ranks
      ,Orders.Id as orders_id
	  ,[Actions].[Is_Goal]
      ,Action_types.Name as action_types_name
      --,[Actions].[Sort_index]
      ,Diameters.Size as Diameters_ID
	  ,Actions.Value
  FROM [dbo].[Actions]
  left join Claims on Claims.Id = Actions.Claim_ID
  left join Orders on Orders.Id = Actions.Order_ID
  left join Action_type_Place_type on Action_type_Place_type.Id = Actions.Action_type_ID
  left join Action_types on Action_types.Id = Action_type_Place_type.Action_type_ID
  left join Diameters on Diameters.Id = Actions.Diameters_ID
WHERE Actions.[Claim_ID]= @Id and Actions.Do_not != 1*/
