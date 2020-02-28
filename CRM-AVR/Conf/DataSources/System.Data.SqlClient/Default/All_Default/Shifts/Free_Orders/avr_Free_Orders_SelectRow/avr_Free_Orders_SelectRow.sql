
SELECT 
	 Orders.Id
	,Orders.Shift_ID as shift_id

FROM Orders 
where 
Orders.Id = @Id 
--and
--Orders.Shift_ID = @shift_id