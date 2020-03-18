SELECT [Appeals].[Id]
      ,concat('Звернення № ', [Appeals].[Id]) as app_Id
      ,concat('Заявка № ', Claims.Claim_Number) as cl_number
      ,[Appeals].[Date] as appeals_date
      ,Contacts.Name as contacts_name
		,Contacts.Id as contacts_Id
	,(select cast(Contact_phones.Number as nvarchar(50)) +';' 
		from Contact_phones 
		where Contact_phones.Contact_ID = Contacts.Id
		for xml path('')
		) as number_name
	,Claims.Claim_Number as claims_number
	   , Claims.Id as claims_Id
	
  FROM [dbo].[Appeals]
	left join Claims on Claims.Id = Appeals.Claim_ID
	left join Contacts on Contacts.Id = Appeals.Contact_ID
    left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
--	left join Claim_SwitchOff_Address on Claim_SwitchOff_Address.Claim_ID = Claims.Id
WHERE Appeals.Id = @Id