if @jobs_id not in ( select Job_ID from Shift_Jobs where Shift_ID = @Shift_ID )  

INSERT INTO [dbo].[Shift_Jobs]
           ([Job_ID]
           ,[Shift_ID]
           -- ,[Is_main]
           -- ,[Is_driver]
           )
--	output [inserted].[Id]
     VALUES
           (@jobs_id
           ,@Shift_ID
           --,@Is_main
           --,@Is_driver
		   )