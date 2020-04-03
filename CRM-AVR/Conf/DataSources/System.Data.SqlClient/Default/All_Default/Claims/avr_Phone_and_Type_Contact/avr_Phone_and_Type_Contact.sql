select ch.Number
	  ,ct.Name
	from Contacts
		left join Contact_phones ch on ch.Contact_ID = Contacts.Id
		left join Contact_types ct on ct.Id = Contacts.Contact_type_ID
	where Contacts.Id = @contact_id