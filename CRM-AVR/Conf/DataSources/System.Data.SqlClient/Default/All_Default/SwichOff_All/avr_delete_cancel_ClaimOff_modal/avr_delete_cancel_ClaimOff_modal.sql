delete from [dbo].[Claim_SwitchOff_Address]
where Claim_ID = @claim_ID and [SwitchOff_start] is null

