SELECT [Organizations].[Id]
      ,[Organizations].[Name] as organization_name
  FROM [dbo].[Organizations]
  where  Organizations.Is_WC = 1
  and
     #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only