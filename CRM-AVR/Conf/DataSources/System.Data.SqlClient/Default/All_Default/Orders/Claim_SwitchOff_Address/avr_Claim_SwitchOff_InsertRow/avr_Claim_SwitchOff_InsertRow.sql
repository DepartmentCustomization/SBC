declare @finish_at datetime
set @finish_at = isnull((select Plan_finish_at from Claims where Id = @Claim_ID), null)


INSERT INTO [dbo].[Claim_SwitchOff_Address]
           ([Place_ID]
           ,[Claim_ID]
           ,[SwitchOff_start]
           ,[SwitchOff_finish]
           ,[SwitchOff_type_id])
output [inserted].[Id]
     VALUES
           (
		    @places_id
           ,@Claim_ID
           ,@SwitchOff_start
           ,isnull(@finish_at,null)
           ,@switchoff_type_id
		   )