SELECT [Jobs].[Id]
      ,[Jobs].[Job_name] as job_name
	  ,Organizations.Name as organizations_name
      ,Positions.Name as positions_name
      ,Organizations.Id as organizations_id
  FROM [dbo].[Jobs]
	left join Positions on Positions.Id = Jobs.Position_ID
	left join Organizations on Organizations.Id = Jobs.Organization_ID
	where [Jobs].[Contacts_ID]= @Id
	and
	#filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only