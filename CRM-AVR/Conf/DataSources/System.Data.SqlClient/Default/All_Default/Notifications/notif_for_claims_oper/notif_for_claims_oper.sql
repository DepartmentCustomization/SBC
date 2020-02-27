declare @org_id int, @posit_id int
select @org_id = Organization_ID, @posit_id = Position_ID from Jobs where login = @user 

select [login]
	from Jobs  j
	where Organization_ID = @org_id
		and Position_ID = @posit_id
		and [Login] is not null
		and [Login] <> @user