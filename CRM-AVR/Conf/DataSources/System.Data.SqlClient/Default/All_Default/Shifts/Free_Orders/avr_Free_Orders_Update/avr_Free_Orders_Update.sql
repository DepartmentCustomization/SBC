update dbo.Orders
	set Orders.Shift_ID =isnull(Orders.Shift_ID, @shift_id)
where Id = @Id