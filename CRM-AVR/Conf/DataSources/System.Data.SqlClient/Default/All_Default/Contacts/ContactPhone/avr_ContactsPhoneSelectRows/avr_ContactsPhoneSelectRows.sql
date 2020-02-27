SELECT  Contacts.[Id]
      ,Contacts.Name as contacts_name
        ,Contacts.Id as contacts_id
	  ,Jobs.Job_name as jobs_name
	  ,tabl_phone.phone_number as number_name
	  ,tabl_phone.phone_name as phone_comment
     -- ,[Contact_phones].[Number] as number_name
     -- ,[Contact_phones].[Name] as phone_comment
  FROM [dbo].Contacts
	left join (SELECT Contact_ID
					,(select rtrim(a.Number) +N';' as 'data()' from dbo.Contact_phones as a where b.Contact_ID = a.Contact_ID for xml path('')) as phone_number
					,(select rtrim(a.Name) +N';' as 'data()' from dbo.Contact_phones as a where b.Contact_ID = a.Contact_ID for xml path('')) as phone_name
			FROM dbo.Contact_phones b GROUP BY Contact_ID) as tabl_phone on tabl_phone.Contact_ID = Contacts.Id
	--left join Jobs on Jobs.Id = Contacts.Job_ID
	left join Jobs on Jobs.Contacts_ID = Contacts.external_id
	where --Contacts.Organisation_ID = @Id
	Jobs.Is_work = 1
	and Jobs.[Organization_ID] = @Id
and
	#filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
