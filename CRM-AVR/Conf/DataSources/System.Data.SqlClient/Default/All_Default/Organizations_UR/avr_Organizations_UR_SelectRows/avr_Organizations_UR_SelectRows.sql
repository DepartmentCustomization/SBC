select 
    Organizations.Id
	,Organizations.Name as organizations_name
	--,Contacts.Name
	,Contact_phones.Number
	,(select cast(phone.Number as nvarchar(50)) +'; ' from Contact_phones as phone where phone.Contact_ID in 
			(select con.Id from Contacts con where con.Organisation_ID = 
				(select org.Id from Organizations as org where org.Id = Organizations.Id)
			)
	  for xml path('')) as number_other
	  ,concat 
	  (	
		  case when Districts.Name is null then Districts.Name else Districts.Name+', ' end,
		  case when Streets.Name is null then Streets.Name else Streets.Name+' ' end,
		  case when Houses.Number is null then Houses.Number else Houses.Number end,
		  case when Houses.Letter is null then Houses.Letter else ' '+ Houses.Letter end
	  ) as adress
	  ,case when Organizations.Is_WC = 0 then 'Ні'
		else 'Так'
	   end as Is_WC
  from Organizations
  left join Contacts on Contacts.Id = Organizations.Contacts_ID
  left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
  left join Houses on Houses.Id = Organizations.Houses_ID
  left join Streets on Streets.Street_id = Houses.Street_id
  left join Districts on Districts.Id = Houses.District_id
  where Organizations.Is_WC <> 1
  and
    #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only