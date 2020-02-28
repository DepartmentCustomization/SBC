declare @output table ([Id] int);
INSERT INTO [dbo].[Jobs]
           ([Contacts_ID]
           ,[Login]
           ,[Password]
           ,[Job_name]
           ,[Organization_ID]
           ,[Position_ID])
output [inserted].[Id] into @output([Id])
     VALUES
           (
		    @contacts_id
           ,@Login
           ,@Password
           ,@job_name
           ,@organizations_id
           ,@positions_id
		   )

declare @job_id int;
set @job_id = (select top 1 [Id] from @output);

UPDATE [dbo].[Contacts]
SET Job_ID = @job_id
where Id = @contacts_id

select @contacts_id as Id;
return;