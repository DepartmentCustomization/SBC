SELECT [Appeals].[Id]
      ,convert(nvarchar(16), [Appeals].[Date], 121) as appeals_date
      ,Contacts.Name as contacts_name
        ,Contacts.Id as contacts_Id
	 -- ,cast (tabl_phone.phone_number as nvarchar) as Number
	 ,Claims.Id as claims_id
  FROM [dbo].[Appeals]
	left join Claims on Claims.Id = Appeals.Claim_ID
	left join Contacts on Contacts.Id = Appeals.Contact_ID
    left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
WHERE Appeals.Id= @Id