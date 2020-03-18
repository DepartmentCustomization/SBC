SELECT [Id]
      ,[Name]
  FROM [dbo].[TypeAccess]
  WHERE TypeAccess.Id @typeAcc and Id not in (100, 101, 102)
  and
  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only