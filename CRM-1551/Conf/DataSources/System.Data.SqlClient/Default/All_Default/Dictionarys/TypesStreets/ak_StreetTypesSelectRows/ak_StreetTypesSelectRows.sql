SELECT [Id]
        ,[name]
      ,[shortname]
      
  FROM   [dbo].[StreetTypes]
  where #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only