DECLARE @info TABLE (Id INT);

INSERT INTO [dbo].[organizations]
           ([Name]
           ,[claim_direction_id]
           ,[appeal_source_id]
           ,[phone_1]
           ,[phone_2]
           ,[created_by]
           ,[updated_by])
 OUTPUT inserted.Id INTO @info
     VALUES
           (@Name
           ,@claim_direction_id
           ,@appeal_source_id
           ,@phone_1
           ,@phone_2
           ,@user_id
           ,@user_id)

select Id from @info 