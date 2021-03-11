SELECT Moves.[Id]
	  ,Mechanisms.Name as mechanisms_name
	  ,Mechanism_types.Name as mechanisms_type_name
	  ,Moves.Departure_at
	 ,Mechanisms.Number as state_number
       ,RANK() OVER(ORDER BY [Orders].Id ASC)  Order_Number
	    
  FROM  Moves 
	left join Orders on Moves.Orders_Id = Orders.Id
	left join Mechanisms on Mechanisms.Id = Moves.Mechanism_ID
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
WHERE Mechanisms.Id is not null and Orders.Claim_id = @claim_id
order by RANK() OVER(ORDER BY [Orders].Id ASC)