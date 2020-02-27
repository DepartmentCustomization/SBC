	UPDATE [dbo].[Claim_SwitchOff_Address]
	   SET
			[SwitchOff_type_id] = isnull(@type_off,SwitchOff_type_id )
			,Faucet_ID  = @Faucet_ID
			,[SwitchOff_start] = (select Faucet.Start_from from Faucet where Id = @Faucet_ID)
	 WHERE Claim_ID = @claim_ID	  and [SwitchOff_start] is null





-- if ( select count(Id) from Claim_SwitchOff_Address where Claim_ID = @claim_ID 
--                                                   and [SwitchOff_start] is null ) > 0
-- begin 
-- 	UPDATE [dbo].[Claim_SwitchOff_Address]
-- 	   SET
-- 			[SwitchOff_type_id] = isnull(@type_off,SwitchOff_type_id )
-- 			,Faucet_ID  = @Faucet_ID
-- 			--,[SwitchOff_start] = isnull(@SwitchOff_start, SwitchOff_start)
-- 			,[SwitchOff_start] = (select Faucet.Start_from from Faucet where Id = @Faucet_ID)
-- 	 WHERE Claim_ID = @claim_ID	  and [SwitchOff_start] is null
-- end
-- else
-- begin
-- 	UPDATE [dbo].[Claim_SwitchOff_Address]
-- 	   SET	
-- 			[SwitchOff_type_id] = isnull(@type_off,SwitchOff_type_id )
-- 			,Faucet_ID  = @Faucet_ID
-- 			--,[SwitchOff_start] = isnull(@SwitchOff_start, SwitchOff_start)
-- 			,[SwitchOff_start] = (select Faucet.Start_from from Faucet where Id = @Faucet_ID)
-- 	 WHERE Claim_ID = @claim_ID
-- end