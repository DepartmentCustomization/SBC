 UPDATE [dbo].[Contacts]
   SET
	[Contact_type_ID]=@contact_types_id
	,[Name]=concat (@Surname,' ',@First_name,' ',@Middle_name)
	,[First_name]=@First_name
	,[Middle_name]=@Middle_name
	,[Surname]=@Surname
	,[Houses_ID]=@houses_id
	,[Flats_ID]=@flats_id
	,[Organisation_ID]=@organizations_id
	,[Job_ID]=@job_id
WHERE Id= @Id

if (select Contact_ID from Contact_phones where Contact_ID = @Id) is not null
begin
    update [dbo].Contact_phones
    	set
    		 Number=@number_name
    		,Name=@comment_phone
    	where Contact_ID = @Id
end
ELSE
begin
if @number_name is not null
    INSERT INTO [dbo].Contact_phones(Contact_ID, Number	, Name	)
	VALUES	( @Id, @number_name, @comment_phone)
end