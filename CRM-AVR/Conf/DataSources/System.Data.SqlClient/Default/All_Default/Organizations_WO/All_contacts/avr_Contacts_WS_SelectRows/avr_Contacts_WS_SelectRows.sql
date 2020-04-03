SELECT [Contacts].[Id]
      ,Contact_types.Name as contact_type_name
	  ,Organizations.Name as organizations_name
	  ,Organizations.Id as organizations_id
	  ,Contacts.Name as contacts_name
	  ,cast (tabl_phone.phone_number as nvarchar) as Number
      ,Jobs.Job_name as jobs_name
	  ,Positions.Name as positions_name
	  ,case when Jobs.is_work = 1 then 'Так'
	            when Jobs.is_work = 0 then 'Ні' 
	   end is_work
  FROM [dbo].[Contacts]
	left join Contact_types on Contact_types.Id = Contacts.Contact_type_ID
	left join Organizations on Organizations.Id = Contacts.Organisation_ID
-- 	left join Jobs on Jobs.Id = Contacts.Job_ID
	left join Jobs on Jobs.Contacts_ID = Contacts.external_Id
	left join Positions on Positions.Id = Jobs.Position_ID
	left join (SELECT Contact_ID
					,(select rtrim(a.Number) +N';' as 'data()' from dbo.Contact_phones as a where b.Contact_ID = a.Contact_ID for xml path('') 
					) as phone_number
			FROM dbo.Contact_phones b GROUP BY Contact_ID) as tabl_phone on tabl_phone.Contact_ID = Contacts.Id 
	where Contacts.Job_ID is not null
	and 
	#filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only