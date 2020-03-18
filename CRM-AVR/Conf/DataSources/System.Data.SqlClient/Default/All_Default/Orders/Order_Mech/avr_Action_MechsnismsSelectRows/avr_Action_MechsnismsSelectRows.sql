SELECT [Actions].[Id]
	  ,Action_types.Name as action_type_name
	  ,Actions.Sort_index
	  ,Mechanisms.Name as mechanisms_name
	  ,Mechanism_types.Name as mechanisms_type_name
	  ,Moves.Departure_at
  FROM [dbo].[Actions]
    left join Orders on Orders.Id = Actions.Order_ID
    left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID 
	left join Action_types on Action_types.Id = atpt.Action_type_Id
	left join Moves on Moves.Action_ID = Actions.Id
	left join Mechanisms on Mechanisms.Id = Moves.Mechanism_ID
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
WHERE Moves.Action_ID = @Id
and 

	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only