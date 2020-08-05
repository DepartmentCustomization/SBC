SELECT [Id]
	,[FirstName]
	,[LastName]
	,[Patronymic]
	,[UseEDS]
	,[INN]
	,[Avatar]
	,[Active]
	,[PhoneNumber]
	,[DashboardPageCode]
	,[SystemUser]
FROM [CRM_1551_Analitics].[dbo].[TestCreateSystemUser]

where [Id] = @Id