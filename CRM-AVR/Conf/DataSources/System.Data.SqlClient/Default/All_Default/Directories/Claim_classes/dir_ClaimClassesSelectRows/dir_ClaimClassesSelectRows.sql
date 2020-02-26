SELECT [Id]
      ,[Name]
  FROM [dbo].[Claim_classes]
WHERE 
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only