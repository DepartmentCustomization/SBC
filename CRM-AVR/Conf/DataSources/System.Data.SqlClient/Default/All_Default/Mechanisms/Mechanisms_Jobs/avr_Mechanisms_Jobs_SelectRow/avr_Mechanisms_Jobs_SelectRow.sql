SELECT [Mechanisms_Jobs_Link].[Id]
      ,[Mechanisms_Jobs_Link].[MechanismsID] as mechanisms_id
      ,Contacts.Name as contacts_name
      ,[Mechanisms_Jobs_Link].[JobsID] as jobs_id
  FROM [dbo].[Mechanisms_Jobs_Link]
	left join Jobs on Jobs.Id = Mechanisms_Jobs_Link.JobsID
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
	left join Mechanisms on Mechanisms.Id = Mechanisms_Jobs_Link.MechanismsID
	where [Mechanisms_Jobs_Link].[Id] = @Id