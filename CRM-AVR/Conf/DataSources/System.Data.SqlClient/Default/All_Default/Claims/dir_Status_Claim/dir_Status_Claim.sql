SELECT [Id]
      ,[Name]
  FROM [dbo].[Status]
  where Object = 'Claim'
and Id not in (1,2)
  order by 1

 offset @pageOffsetRows rows fetch next @pageLimitRows rows only