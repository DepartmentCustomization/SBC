SELECT [Mechanisms_Jobs_Link].[Id]
      ,Contacts.Name as contact_name
	  ,Jobs.Job_name as jobs_name
	  ,cast (tabl_phone.phone_number as nvarchar) as Number
  FROM [dbo].[Mechanisms_Jobs_Link]
	left join Jobs on Jobs.Id = Mechanisms_Jobs_Link.JobsID
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join -- Contact_phones on Contact_phones.Contact_ID = Contacts.Id
	        (SELECT Contact_ID
					,(select rtrim(a.Number) +N';' as 'data()' from dbo.Contact_phones as a where b.Contact_ID = a.Contact_ID for xml path('')) as phone_number
			FROM dbo.Contact_phones b GROUP BY Contact_ID) as tabl_phone on tabl_phone.Contact_ID = Contacts.Id
	left join Mechanisms on Mechanisms.Id = Mechanisms_Jobs_Link.MechanismsID
	where Mechanisms_Jobs_Link.MechanismsID = @Id
	and 
	#filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only