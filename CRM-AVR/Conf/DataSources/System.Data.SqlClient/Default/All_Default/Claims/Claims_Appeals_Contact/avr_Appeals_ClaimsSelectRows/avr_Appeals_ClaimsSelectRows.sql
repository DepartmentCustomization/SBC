SELECT --[Appeals].[Id]
      --,concat('Звернення № ', [Appeals].[Id]) as app_Id
      count([Appeals].[Id])  as app_Id
      ,convert(nvarchar(10), [Appeals].[Date], 104) as [Date]
      ,Contacts.Name
     -- ,Contacts.Id as contacts_id
	  ,cast (tabl_phone.phone_number as nvarchar) as Number
	 -- ,Claims.Claim_Number
  FROM [dbo].[Appeals]
	left join Claims on Claims.Id = Appeals.Claim_ID
	left join Contacts on Contacts.Id = Appeals.Contact_ID
  left join --Contact_phones on Contact_phones.Contact_ID = Contacts.Id
            (SELECT Contact_ID
					,(select rtrim(a.Number) +N';' as 'data()' from dbo.Contact_phones as a where b.Contact_ID = a.Contact_ID for xml path('') 
					) as phone_number
			FROM dbo.Contact_phones b GROUP BY Contact_ID) as tabl_phone on tabl_phone.Contact_ID = Contacts.Id
WHERE Appeals.Claim_ID= @Id
--and
--	#filter_columns#
--     #sort_columns#

 group by convert(nvarchar(10), [Appeals].[Date], 104), Contacts.Name, cast (tabl_phone.phone_number as nvarchar)
 -- offset @pageOffsetRows rows fetch next @pageLimitRows rows only
 