SELECT [Jobs].[Id]
      ,[Job_name]
	  ,[Contacts].Name

  FROM [dbo].[Jobs]
  left join [Contacts] on [Jobs].Contacts_ID = [Contacts].external_Id

  where jobs.Organization_ID = @organization_id
  and Jobs.Is_work = 1