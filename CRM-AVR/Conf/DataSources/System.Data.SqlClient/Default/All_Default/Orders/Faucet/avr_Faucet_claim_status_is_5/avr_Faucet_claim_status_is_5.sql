select @status_claim = Status_ID from Claims where Id = (select [Claim_Id] from Faucet where Id = @Id )

select @status_claim as status_claim