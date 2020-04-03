if (@is_External_service = 1)
begin
	set @Contact_type_ID = 5 --Зовнішня служба
end
else
begin
	set @Contact_type_ID = 2 --Абонент юридична особа
end
	
	
	UPDATE [dbo].[Organizations]
     set
		   [Name]= @organizations_name
		   ,Houses_ID = isnull(@adress_id, null)
		   ,is_External_service = @is_External_service
	       ,is_Contract_organization = @is_Contract_organization
	       ,is_Special_service = @is_Special_service
		where Id = @Id

	update Contacts	
		set [Name] = @organizations_name
			,Houses_ID = isnull(@adress_id, null)
			,Contact_type_ID = @Contact_type_ID
		where Contacts.Id = @Contacts_ID --(select top 1 Contacts_ID from [dbo].[Organizations] where id = @Id)

if (select Id from Contact_phones where Contact_ID = @Contacts_ID  ) is null
begin
	insert Contact_phones
		(Contact_ID, Number, Name)
		values (@Contacts_ID, @Number, @phone_comment)
end
	else
begin
	update Contact_phones
		set [Name] = @phone_comment
end
