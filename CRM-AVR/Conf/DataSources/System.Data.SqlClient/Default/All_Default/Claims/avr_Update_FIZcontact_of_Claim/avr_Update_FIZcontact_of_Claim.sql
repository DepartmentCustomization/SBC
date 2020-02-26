 UPDATE [dbo].[Contacts]
   SET
	[Name]=@FIZ_contact_fio
WHERE Id= @Id

if (select Contact_ID from Contact_phones where Contact_ID = @Id) is not null
begin
    update [dbo].Contact_phones
    	set
    		 Number=@FIZ_number
    	where Contact_ID = @Id
end
ELSE
begin
if @FIZ_number is not null
    INSERT INTO [dbo].Contact_phones(Contact_ID, Number	)
	VALUES	( @Id, @FIZ_number)
end