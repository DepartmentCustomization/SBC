SELECT [Teams].[Id]
      ,[Teams].[Name]
      ,[Teams].[Organization_ID]
      ,[Teams].[Plan_start_time]
      ,[Teams].[Plan_end_time]
  FROM [dbo].[Teams]
	left join Organizations on Organizations.Id = Organization_ID
	where Organizations.Id @OrgID