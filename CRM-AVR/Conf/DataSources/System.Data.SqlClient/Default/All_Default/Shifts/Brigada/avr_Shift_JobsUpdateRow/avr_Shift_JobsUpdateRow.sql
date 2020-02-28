UPDATE [dbo].[Shift_Jobs]
	SET		--[Job_ID]= @jobs_id
           [Is_main]= @Is_main
           ,[Is_driver] = @Is_driver
		WHERE Id= @Id