SELECT [Id]
      ,[Name]
  FROM [dbo].[Status]
  where Object = 'Orders'
 -- and    #filter_columns#     #sort_columns#
 order by 1
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only