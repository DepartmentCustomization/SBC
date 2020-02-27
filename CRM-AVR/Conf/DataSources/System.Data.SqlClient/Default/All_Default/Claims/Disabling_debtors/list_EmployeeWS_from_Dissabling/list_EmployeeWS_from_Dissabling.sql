SELECT [Contacts].[Id]
      ,[Contacts].[Name]
  FROM [dbo].[Contacts]
--	left join Contact_phones on Contact_phones.Contact_ID = Contacts.Id
	where Organisation_ID = 1
	and
     #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only