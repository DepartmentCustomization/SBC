SELECT [Jobs].[Id]
	  ,Organizations.Name as organizations_name
	  ,Contacts.Name as contacts_name
      ,[Jobs].[Job_name] as job_name
      ,Positions.Name as positions_name
	  ,concat(Contacts.Name,' - ',[Jobs].[Job_name],' - ',Organizations.Name) as jobs
  FROM [dbo].[Jobs]
	left join Positions on Positions.Id = Jobs.Position_ID
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join Organizations on Organizations.Id = Jobs.Organization_ID
where Contacts.Contact_type_ID in (3,4) and  Organizations.Id = @sh_id
	and
	#filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only