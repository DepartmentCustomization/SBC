SELECT [Jobs].[Id]
      ,[Jobs].[Job_name] as job_name
	  --,Organizations.Name as organizations_name
		,Organizations.Id as organizations_id
      ,Positions.Name as positions_name
		,Positions.Id as positions_id
	  ,Jobs.Contacts_ID as contacts_id
  FROM [dbo].[Jobs]
	left join Positions on Positions.Id = Jobs.Position_ID
	left join Organizations on Organizations.Id = Jobs.Organization_ID
	where [Jobs].[Id]= @Id