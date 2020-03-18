SELECT 
	 Orders.Id
	,Claims.Claim_Number
	,Orders.Start_at
	,Claim_types.Name
	,Claims.Priority
	,Places.Name as places_name
	,Orders.Overtime
	FROM Orders
		left join Shifts on Shifts.Id = Orders.Shift_ID
		left join Claims on Claims.Id = Orders.Claim_ID
		left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
		left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id and Is_first_place = 1
		left join Places on Places.Id = Claim_Order_Places.Place_ID
	where Orders.Shift_ID = @Id
	and 	
	 #filter_columns#
     --#sort_columns#
     order by Orders.Start_at
offset @pageOffsetRows rows fetch next @pageLimitRows rows only