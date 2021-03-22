SELECT DISTINCT Contacts2.[Id]
      ,Contacts2.[Name]
  FROM [dbo].[Organizations]
  left join Contacts on Contacts.Id = Organizations.Contacts_ID
  left join Contacts Contacts2 on Contacts2.Organisation_ID = [Organizations].Id
  where [Contacts].[Contact_type_ID] = 5
  and #filter_columns#
   #sort_columns#
  offset @pageOffsetRows rows fetch next @pageLimitRows rows only