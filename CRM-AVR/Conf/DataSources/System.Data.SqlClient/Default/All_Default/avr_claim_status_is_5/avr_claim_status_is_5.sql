select @status_claim = Status_ID from Claims where Id = @claim_id

select @status_claim as status_claim