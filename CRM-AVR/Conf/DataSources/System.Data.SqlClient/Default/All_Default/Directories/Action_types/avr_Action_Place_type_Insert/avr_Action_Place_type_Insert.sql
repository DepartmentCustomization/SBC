INSERT INTO [dbo].[Action_type_Place_type]
			(
			Action_type_Id 
			,[Place_type_Id]
			) 
	output [inserted].[Id]
    values
    	(
    	 @action_type_id
    	, @places_type_id
    	)
