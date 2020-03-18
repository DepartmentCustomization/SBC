INSERT INTO [dbo].[Sequela]
           ([Claim_ID]
           ,[Actions_ID]
           ,[Description]
           ,[Created_at]
           ,[Fact_finish_at])
     VALUES
           (@Claim_ID
           ,@Actions_ID
           ,@Description
           ,isnull(@Created_at, GETUTCDATE() )
           ,@Fact_finish_at
		   )