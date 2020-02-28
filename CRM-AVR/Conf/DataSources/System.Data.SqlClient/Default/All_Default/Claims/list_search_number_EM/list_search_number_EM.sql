select 
	 Contacts.Id 
	,Contacts.Name
	,Contact_phones.Number
	,Contact_phones.Name as phone_type
	from Contacts
	left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
	
	where Contacts.Contact_type_ID = 1
	and Contact_phones.Number like '%'+@number+'%'
	 and #filter_columns#
	 #sort_Columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only