declare @cont_Phone nvarchar(200)
if len(@contacts_Phone) = 0
begin
set @cont_Phone =  NULL
end
else 
begin
set @cont_Phone =  @contacts_Phone
end

declare @output table ([Id] int);
   
INSERT INTO [dbo].[Contacts]
           ([Contact_type_ID]
           ,[Name]
           ,[First_name]
           ,[Middle_name]
           ,[Surname]
           ,[Houses_ID]
           ,[Flats_ID]
           ,[Organisation_ID]
           --,[Job_ID]
           )
output [inserted].[Id] into @output([Id])
     VALUES
           (1
           ,@contacts_Name
           ,NULL
           ,NULL
           ,NULL
           ,NULL
           ,NULL
           ,NULL
           --,@job_id
		   )
declare @cont_id int;
set @cont_id = (select top 1 [Id] from @output);


if @cont_Phone is not NULL
begin
INSERT INTO [dbo].Contact_phones
	(
		Number
		,Name
		,Contact_ID
	)
	VALUES
	(
		 @cont_Phone
		,NULL
		,@cont_id
	);
end;

	
 INSERT INTO [dbo].[Appeals]
           ([Claim_ID]
           ,[Contact_ID]
           ,[Date])
output [inserted].[Id]
        VALUES
           (
		    @claims_Id
           ,@cont_id
           ,getutcdate()
		   )
