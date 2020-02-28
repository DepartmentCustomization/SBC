SELECT [Id]
      ,[Name]
  FROM [dbo].[Claim_link_types]
 WHERE 
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only