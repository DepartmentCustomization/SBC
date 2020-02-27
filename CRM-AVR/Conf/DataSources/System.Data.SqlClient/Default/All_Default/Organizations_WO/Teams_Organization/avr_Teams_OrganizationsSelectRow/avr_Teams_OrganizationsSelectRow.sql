SELECT [Teams].[Id]
      ,[Teams].[Name] as teams_name
      ,[Teams].[Plan_start_time]
      ,[Teams].[Plan_end_time]
      ,[Teams].[Organization_ID] as organizations_id
  FROM [dbo].[Teams]
  -- left join Organizations on Organizations.Id = Teams.Organization_ID
	where [Teams].Id= @Id