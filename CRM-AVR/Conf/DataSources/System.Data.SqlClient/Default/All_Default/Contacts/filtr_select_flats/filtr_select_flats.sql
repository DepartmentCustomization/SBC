SELECT [Id]
      ,[Number]
      ,Houses_ID
  FROM [dbo].[Flats]
	where Houses_ID = @house_id
	and 
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only