SELECT Jobs.Id
	,Contacts.Name as contact_name
	,Jobs.Job_name
	--,Jobs.Organization_ID
	,Organizations.Name as organizations_name
	FROM [dbo].[Jobs]
		left join Contacts on Contacts.Id = Jobs.Contacts_ID
		left join Organizations on Organizations.Id = Jobs.Organization_ID
	where Jobs.Organization_ID = @organization and
    #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only