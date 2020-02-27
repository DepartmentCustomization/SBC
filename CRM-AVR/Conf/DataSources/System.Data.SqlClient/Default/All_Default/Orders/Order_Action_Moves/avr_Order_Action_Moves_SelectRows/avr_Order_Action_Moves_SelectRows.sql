SELECT [Actions].[Id]
	  ,Mechanisms.Name as mechanisms_name
	  ,Moves.Departure_at
	  ,Moves.Distanse
	  ,Places.Name as places_start_name
	  ,Places2.Name as places_finish_name
  FROM [dbo].[Actions]
    left join Orders on Orders.Id = Actions.Order_ID
	left join Moves on Moves.Action_ID = Actions.Id
	left join Mechanisms on Mechanisms.Id = Moves.Mechanism_ID
	left join Places on Places.Id = Moves.Start_place_ID 
	left join Places Places2 on Places2.Id = Moves.Finish_place_ID 
WHERE Actions.Order_ID = @Id
and Mechanisms.Id is not null
and
  #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only