INSERT INTO [dbo].[Orders]
           (
		    [Claim_ID]
           ,[Shift_ID]
           ,[Created_at]
           ,[Pushed_at]
           ,[Start_at]
           ,[Plan_duration]
           ,[Finished_at]
           ,[Closed_at]
           ,[Status_ID]
		   )
	output [inserted].[Id]
     VALUES
           (
		    @claims_id
           ,@shifts_Id
           ,getutcdate() --@Created_at
           ,@Pushed_at
           ,@Start_at
           ,@Plan_duration
           ,@Finished_at
           ,@Closed_at
           ,@status_id
		   )