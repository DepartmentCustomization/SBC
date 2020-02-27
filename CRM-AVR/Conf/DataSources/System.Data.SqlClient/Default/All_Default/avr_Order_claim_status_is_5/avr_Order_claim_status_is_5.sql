select @status_claim = Status_ID from Claims where Id = (select Claim_ID from Orders where Id =  @order_id)

select @status_claim as status_claim