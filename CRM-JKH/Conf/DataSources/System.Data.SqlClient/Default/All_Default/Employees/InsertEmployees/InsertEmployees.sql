DECLARE @info TABLE (Id int);

INSERT INTO [dbo].[employees]
           ([organization_id]
           ,[PIB]
           ,[position]
           ,[phone_1]
           ,[phone_2]
           ,[UserId]
           ,[created_by]
           ,[updated_by])
OUTPUT inserted.Id INTO @info
     VALUES
           (@organization_id
           ,@PIB
           ,@position
           ,@phone_1
           ,@phone_2
           ,@User
           ,@user_id
           ,@user_id)

		   IF(SELECT top 1 Id FROM @info) is not null 
		   BEGIN
		   SELECT Id FROM @info
		   END