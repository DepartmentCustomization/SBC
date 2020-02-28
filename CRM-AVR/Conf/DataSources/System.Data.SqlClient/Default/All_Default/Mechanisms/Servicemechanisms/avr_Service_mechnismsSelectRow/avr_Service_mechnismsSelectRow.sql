SELECT [Maintenance].[Id]
      ,[Maintenance].[MechanismsID]
      ,[Maintenance].[Start_at]
      ,[Maintenance].[Finished_at]
      ,[Maintenance].[Name]
      ,[Maintenance].[Comment]
	  ,Contacts.Name as Contact_Name
      ,Contacts.Id as Contacts_ID
  FROM [dbo].[Maintenance]
  left join Contacts on Contacts.Id = Contacts_ID
  where [Maintenance].Id = @Id