if @switchOff_type is null or @faucet_id is null
begin
	RAISERROR  ('Відключення діє через кнопку "Відключення"', -- Message text.
               16, -- Severity.
               1 -- State.
               );
end
else
begin
		if not exists (select Id from Claim_SwitchOff_Address  where Place_ID = @Place_ID and SwitchOff_finish is null)
			begin
				INSERT INTO [dbo].[Claim_SwitchOff_Address]
					   ([Place_ID]
					   ,[Claim_ID]
					   ,[SwitchOff_type_id]
					   ,[Faucet_ID]
					   ,[SwitchOff_start]
					   )
				 VALUES
					   (@Place_ID
					   ,@Claim_ID
					   ,@switchOff_type
					   ,@faucet_id
					   ,(select [Start_from] from [dbo].[Faucet] where Id = @faucet_id)
					   )
					   
			end
end

/*
if @switchOff_type is null or @faucet_id is null
begin
	RAISERROR  ('Відключення діє через кнопку "Відключення"', -- Message text.
               16, -- Severity.
               1 -- State.
               );
end
else
begin
	if not exists (select Id from Claim_SwitchOff_Address  where Place_ID = @Place_ID and SwitchOff_finish is null)
		begin
			INSERT INTO [dbo].[Claim_SwitchOff_Address]
				   ([Place_ID]
				   ,[Claim_ID]
				   ,[SwitchOff_type_id]
				   ,[Faucet_ID]
				   ,[SwitchOff_start]
				   )
			 VALUES
				   (@Place_ID
				   ,@Claim_ID
				   ,@switchOff_type
				   ,@faucet_id
				   ,(select [Start_from] from [dbo].[Faucet] where Id = @faucet_id)
				   )
		end
end

*/