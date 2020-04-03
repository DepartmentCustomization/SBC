SELECT [Moves].[Id]
      ,[Moves].[Action_ID]
      ,Mechanisms.Name as mechanisms_name
		,Mechanisms.Id as mechanisms_id
      ,[Moves].[Departure_at]
      ,[Moves].[InPlace_at]
      ,[Moves].[Distanse]
      ,Places.Name as places_start_name
		,Places.Id as places_start_id
      ,Places2.Name as places_finish_name
		, Places2.Id as places_finish_id
  FROM [dbo].[Moves]
	left join Actions on Actions.Id = Moves.Action_ID
	left join Mechanisms on Mechanisms.Id = Moves.Mechanism_ID
	left join Places on Places.Id = Moves.Start_place_ID
	left join Places Places2 on Places2.Id = Actions.Place_ID
where Moves.Action_ID = @Id