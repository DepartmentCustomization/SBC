SELECT [Shift_Jobs].[Id]
	  ,Contacts.Name as contacts_name
		,Contacts.Id as contacts_id
	  ,Jobs.Job_name as jobs_name
		,Jobs.Id as jobs_id
	  ,[Shift_Jobs].[Is_main]
      ,[Shift_Jobs].[Is_driver]
	  ,Contact_phones.Number as number_name
		,Contact_phones.Id as number_id
		,Shift_Jobs.Shift_ID
  FROM [dbo].[Shift_Jobs]
	left join Shifts on Shifts.Id = Shift_Jobs.Shift_ID
	left join Jobs on Jobs.Id = Shift_Jobs.Job_ID
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
where Shift_Jobs.Id= @Id