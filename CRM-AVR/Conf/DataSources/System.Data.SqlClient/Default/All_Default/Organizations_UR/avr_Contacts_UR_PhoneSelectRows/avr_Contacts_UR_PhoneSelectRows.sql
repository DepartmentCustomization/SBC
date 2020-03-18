SELECT  [Contact_phones].[Id]
      ,Contacts.Name as contacts_name
        ,Contacts.Id as contacts_id
      ,[Contact_phones].[Number] as number_name
      ,[Contact_phones].[Name] as phone_comment
  FROM [dbo].[Contact_phones]
	left join Contacts on Contacts.Id = Contact_phones.Contact_ID
	where Contacts.Organisation_ID = @Id and
	#filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only