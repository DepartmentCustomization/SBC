-- declare @Id int = 7

if exists (select * from Claim_SwitchOff_Address where Faucet_ID = @Id)
begin 
	select 1 as switch
end
else
begin
	select 0 as switch
end