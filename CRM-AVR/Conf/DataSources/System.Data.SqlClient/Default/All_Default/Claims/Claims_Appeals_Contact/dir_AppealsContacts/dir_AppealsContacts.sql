select
    Contacts.Id
	,(case when  Contacts.Organisation_ID is not null or Contacts.Contact_type_ID = 1 then 'Фізична особа'
		else 'Юридична особа' end) as type
	,Contacts.Name
	,Contact_phones.Number
	,concat 
	  (	
		  case when Districts.Name is null then Districts.Name else Districts.Name+', ' end,
		  case when Streets.Name is null then Streets.Name else Streets.Name+' ' end,
		  case when Houses.Number is null then Houses.Number else Houses.Number end,
		  case when Houses.Letter is null then Houses.Letter else ' '+ Houses.Letter end,
		  case when Houses.Сorps is null then Houses.Сorps else ' '+ Houses.Сorps end
	  ) as adress
  from Contacts
  left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
   left join Organizations on Contacts.Id = Organizations.Contacts_ID
  --left join Houses on Houses.Id = Organizations.Houses_ID 
  left join Houses on Houses.Id = Contacts.Houses_ID or Houses.Id = Organizations.Houses_ID 
  left join Streets on Streets.Id = Houses.Street_id
  left join Districts on Districts.Id = Houses.District_id
  where 
  
  #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only