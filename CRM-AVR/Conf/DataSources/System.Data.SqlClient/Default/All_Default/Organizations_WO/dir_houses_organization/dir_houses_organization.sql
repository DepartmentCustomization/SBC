SELECT [Houses].[Id]
	  ,Districts.Name as districts
	  ,concat (Districts.Name, ' ', Streets.Name,' ', Houses.Name ) as houses
  FROM [dbo].[Houses]
	left join Streets on Streets.Id = Houses.Street_id
	left join Districts on Districts.Id = Houses.District_id
WHERE 
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only