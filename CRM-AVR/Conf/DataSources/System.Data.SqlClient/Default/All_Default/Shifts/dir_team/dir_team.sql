SELECT [Teams].[Id]
	  ,Organizations.Name as organizations_name
      ,[Teams].[Name]
      ,[Teams].[Plan_start_time]
      ,[Teams].[Plan_end_time]
	  ,concat (Organizations.Name,' - ',[Teams].[Name]) as team
  FROM [dbo].[Teams]
	left join Organizations on Organizations.Id = Organization_ID
	WHERE Organizations.Id  @organ
	and
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only