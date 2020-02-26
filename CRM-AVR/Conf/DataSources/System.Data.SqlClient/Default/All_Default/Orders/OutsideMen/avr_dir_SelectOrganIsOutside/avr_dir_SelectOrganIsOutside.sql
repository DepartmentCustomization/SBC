SELECT [Organizations].[Id]
      ,[Organizations].[Name]
      ,[Organizations].[Contacts_ID]
  FROM [dbo].[Organizations]
  left join Contacts on Contacts.Id = Organizations.Contacts_ID
  where [Contacts].[Contact_type_ID] = 5
  and 
	 #filter_columns#
	 #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only