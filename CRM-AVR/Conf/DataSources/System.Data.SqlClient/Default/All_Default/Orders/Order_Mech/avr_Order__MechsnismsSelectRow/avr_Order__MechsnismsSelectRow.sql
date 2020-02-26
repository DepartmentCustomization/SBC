SELECT Moves.[Id]
	  ,Mechanisms.Name as mechanisms_name
	  ,Mechanism_types.Name as mechanisms_type_name
	  ,Moves.Departure_at
	  ,Moves.Orders_Id
  FROM  Moves 
	left join Orders on Moves.Orders_Id = Orders.Id
	left join Mechanisms on Mechanisms.Id = Moves.Mechanism_ID
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
WHERE Moves.Id = @Id 