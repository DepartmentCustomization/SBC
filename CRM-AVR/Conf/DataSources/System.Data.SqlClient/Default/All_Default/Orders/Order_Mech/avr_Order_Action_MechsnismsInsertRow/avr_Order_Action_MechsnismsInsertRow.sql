INSERT INTO [dbo].[Moves]
           ([Action_ID]
           ,[Mechanism_ID]
           ,[Departure_at]
           ,[InPlace_at]
           ,[Distanse]
           ,[Start_place_ID]
           ,[Finish_place_ID])
	output [inserted].[Id]
     VALUES
           (@Action_ID
           ,@mechanisms_id
           ,@Departure_at
           ,@InPlace_at
           ,@Distanse
           ,@places_start_id
           ,@places_finish_id
		   )