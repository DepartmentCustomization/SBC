SELECT [Jobs].[Id]
      ,[Jobs].[Job_name] as job_name
      ,Organizations.Name as organizations_name
      ,Positions.Name as positions_name
  FROM [dbo].[Jobs]
	left join Contacts on Contacts.Id = Jobs.Contacts_ID
	left join Positions on Positions.Id = Jobs.Position_ID
	left join Organizations on Organizations.Id = Jobs.Organization_ID
	WHERE 
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only