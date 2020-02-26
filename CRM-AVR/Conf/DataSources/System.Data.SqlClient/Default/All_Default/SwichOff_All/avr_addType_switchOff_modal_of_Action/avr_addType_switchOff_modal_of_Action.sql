UPDATE [dbo].[Claim_SwitchOff_Address]
   SET[SwitchOff_type_id] = isnull(@type_off,SwitchOff_type_id )
        ,[SwitchOff_start] = isnull(@SwitchOff_start, SwitchOff_start)
        ,SwitchOff_finish = isnull(@SwitchOff_finish, SwitchOff_finish)
 WHERE Claim_ID = @claim_ID
 and [SwitchOff_start] is null