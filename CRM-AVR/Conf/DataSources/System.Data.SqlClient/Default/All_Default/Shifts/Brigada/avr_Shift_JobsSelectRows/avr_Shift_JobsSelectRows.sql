SELECT [Shift_Jobs].[Id]
	  ,Contacts.Name as contacts_name
	  ,Jobs.Job_name as jobs_name
	  ,[Shift_Jobs].[Is_main]
      ,[Shift_Jobs].[Is_driver]
	  ,cast (tabl_phone.phone_number as nvarchar) as Number
  FROM [dbo].[Shift_Jobs]
	left join Shifts on Shifts.Id = Shift_Jobs.Shift_ID
	left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join 
            (SELECT Contact_ID
					,(select rtrim(a.Number) +N';' as 'data()' from dbo.Contact_phones as a where b.Contact_ID = a.Contact_ID for xml path('') 
					) as phone_number
			FROM dbo.Contact_phones b GROUP BY Contact_ID) as tabl_phone on tabl_phone.Contact_ID = Contacts.Id

where Shift_Jobs.Shift_ID= @Id
and
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only