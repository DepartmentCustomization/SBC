UPDATE [dbo].[Claim_SwitchOff_Address]
   SET SwitchOff_finish = isnull(@SwitchOff_finish, SwitchOff_finish)
 WHERE Claim_ID = @claim_ID
--  and [SwitchOff_start] is null