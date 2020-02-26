SELECT [Contacts].[Id]
      ,Contact_types.Name as type_name
      ,[Contacts].[Name]
	  ,Contact_phones.Number
  FROM [dbo].[Contacts]
	left join Contact_types on Contact_types.Id = Contacts.Contact_type_ID
	left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
	WHERE 

	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only