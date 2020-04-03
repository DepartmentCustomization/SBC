update [dbo].[Claim_SwitchOff_Address]
    set       
		    [Place_ID]= @places_id
           ,[SwitchOff_start]= @SwitchOff_start
           ,[SwitchOff_finish]= @finish_at
           ,[SwitchOff_type_id]= @switchoff_type_id
		   
where Id = @Id