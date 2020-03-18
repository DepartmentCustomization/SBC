declare @create_claims datetime

if @flag = 1
begin
select @create_claims = Created_at from Claims where Id =  @claim_id
	if  @create_claims < @time
	begin
		select 1 
		--print 'Good'
	end
	else 
	begin
		select 0
		--print 'Bad'
	end
end

if @flag = 2
begin
select @create_claims = Start_from from Faucet where Id = @faucet_id
	if  @create_claims < @time
	begin
		select 1 
		--print 'Good'
	end
	else 
	begin
		select 0
		--print 'Bad'
	end
end