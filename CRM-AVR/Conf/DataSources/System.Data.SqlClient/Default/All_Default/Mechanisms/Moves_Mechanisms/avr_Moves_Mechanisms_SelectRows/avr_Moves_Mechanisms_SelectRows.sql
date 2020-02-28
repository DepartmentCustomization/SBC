
SELECT distinct [Moves].[Id]
	  ,Contacts.Name as contacts_name
	  ,[Moves].[Departure_at]
      ,[Moves].[Distanse]
	  ,Places.Name as start_place_name
	  ,Places2.Name as finish_place_name
  FROM [dbo].[Moves]
  	left join Mechanisms on Mechanisms.Id = Moves.Mechanism_ID
    left join Actions on Actions.Id = Moves.Action_ID
    left join Orders on Orders.Id = Actions.Order_ID
    left join Shifts on Shifts.Id = Orders.Shift_ID
	left join Shift_Jobs on Shift_Jobs.Shift_ID = Shifts.Id 
	left join Jobs on Jobs.Id = Shift_Jobs.Job_ID  
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join Places on Places.Id = Moves.Start_place_ID
	left join Places as Places2 on Places2.Id = Moves.Finish_place_ID
WHERE Shift_Jobs.Is_driver = 1 and 
	Moves.Mechanism_ID = @Id
	and
	#filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only