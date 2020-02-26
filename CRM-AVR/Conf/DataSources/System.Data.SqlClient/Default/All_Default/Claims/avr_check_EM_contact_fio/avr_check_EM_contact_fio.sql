select Id, Short_name
	from Organizations
	where Id = ( select Organization_ID from Jobs where Contacts_ID = @job )