SELECT [Flats].[Id]
      ,concat (Streets.Name,Houses.Name) as streets_name
	  ,Houses.Name as houses_name
      ,[Flats].[Floor]
      ,[Flats].[Porch]
      ,[Flats].[Number]
      ,[Flats].[Letter]
  FROM [dbo].[Flats]
	left join Houses on Houses.Id = Flats.Houses_ID
	left join Streets on Streets.Id = Houses.Street_id
WHERE #filter_columns#
-- and [Flats].[Houses_ID] = @flat
order by Houses.Name, [Flats].[Number]
	 
    -- #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only