
SELECT [Contact_phones].[Id]
      --,[Contact_phones].[Contact_ID]
      ,[Contact_phones].[Number] as contact_number
      ,[Contact_phones].[Name] as contact_comment
  FROM [dbo].[Contact_phones]
	left join Contacts on Contacts.Id = Contact_phones.Contact_ID
	where [Contact_phones].[Contact_ID] = @Id
	and
	#filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only