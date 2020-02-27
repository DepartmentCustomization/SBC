SELECT [Actions].[Id]
	  ,[Actions].[Sort_index]
	  ,Action_types.Name as action_types_name
	  ,Action_types.Is_move
	  ,Places.Name as places_name 
	 -- ,[Actions].[Plan_duration]
	  --,Actions.Fact_duration
	   ,Diameters.Size as Diameters_ID
	  ,Actions.Value
	  ,case when Do_not = 0 then '+'
	    else '-' end Do_not
 FROM [dbo].[Actions]
  left join Claims on Claims.Id = Actions.Claim_ID
  left join Orders on Orders.Id = Actions.Order_ID
  left join Action_type_Place_type on Action_type_Place_type.Id = Actions.Action_type_ID
  left join Action_types on Action_types.Id = Action_type_Place_type.Action_type_Id
 -- left join Action_Materials on Action_Materials.Action_ID = Actions.Id
  left join Places on Places.Id = Actions.Place_ID
    left join Diameters on Diameters.Id = Actions.Diameters_ID
WHERE [Actions].[Order_ID]= @Id
and
	 #filter_columns#
    order by Actions.Do_not,[Actions].[Sort_index] 
    -- #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only