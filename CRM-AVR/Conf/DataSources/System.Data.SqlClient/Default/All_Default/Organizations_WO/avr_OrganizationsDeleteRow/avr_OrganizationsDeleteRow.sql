delete from [dbo].[Contact_phones] 
	where Contact_phones.Contact_ID = (select Contacts.Id from Contacts where Contacts.Id = (select Organizations.Contacts_ID from Organizations where Organizations.Id= @Id))

Delete from [dbo].[Contacts]
	where Id = (select Organizations.Contacts_ID from Organizations where Organizations.Id= @Id)
	
DELETE FROM [dbo].[Organizations]
      WHERE Id = @Id