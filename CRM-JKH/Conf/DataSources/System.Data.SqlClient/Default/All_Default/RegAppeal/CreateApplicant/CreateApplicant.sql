
if len(isnull(rtrim(@applicant_id),N'')) > 0
begin
		update [dbo].[applicants] set
				[PIB] = @PIB
		      ,[Phone1] = @Phone1
		      ,[Phone2] = @Phone2
		      ,[EMail] = @EMail
		      ,[House_id] = convert(uniqueidentifier, @House_id)
		      ,[Flat] = @Flat
		      ,[updated_by] = @UserId
		where Id = @applicant_id

		select @applicant_id as Id
end
else
begin
	 insert into [dbo].[applicants] ([PIB]
	      ,[Phone1]
	      ,[Phone2]
	      ,[EMail]
	      ,[House_id]
	      ,[Flat]
	      ,[created_by]
	      ,[updated_by])
	output inserted.Id
	values (@PIB
			,@Phone1
			,@Phone2
			,@EMail
			,convert(uniqueidentifier, @House_id)
			,@Flat
			,@UserId
			,@UserId
			)
end