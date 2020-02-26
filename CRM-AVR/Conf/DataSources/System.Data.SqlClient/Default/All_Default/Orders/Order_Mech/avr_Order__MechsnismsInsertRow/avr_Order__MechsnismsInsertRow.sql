INSERT INTO [dbo].[Moves]
           ( Orders_Id
           ,[Mechanism_ID]
           ,[Departure_at])
-- 	output [inserted].[Id]
     VALUES
           (@orders_id
           ,@mechanisms_id
           ,isnull(@Departure_at, (select Start_at from Orders where Id = @orders_id) )
		   )