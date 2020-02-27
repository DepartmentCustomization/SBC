
if (select Status_ID from Claims where Id in (select Claim_ID from Claim_Order_Places where Id = @Id) ) <> 5
begin

	delete from Claim_Order_Places 
		where Id = @Id
		and Is_first_place <> 1
end
	else
begin
	RAISERROR('Заявка закрита, видалення заборонено',16,1)
end