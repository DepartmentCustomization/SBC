SELECT [Teams].[Id]
      ,[Teams].[Name]
      --,cast([Teams].[Plan_start_time] as nvarchar(100)) as [Plan_start_time]
      --,cast([Teams].[Plan_end_time] as nvarchar(100)) as [Plan_end_time]
      ,[Teams].[Plan_start_time]
      ,[Teams].[Plan_end_time]
	  ,Teams.Organization_ID as organizations_id
  FROM [dbo].[Teams]
   -- left join Organizations on Organizations.Id = Teams.Organization_ID
	where Teams.Organization_ID = @Id and
	#filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only