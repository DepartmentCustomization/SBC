SELECT [Flats].[Id]
      ,[Streets].Name as streets_name
		,Streets.Id as streets_id
	  ,Houses.Name as houses_name
		,Houses.Holder_id as houses_id
      ,[Flats].[Floor]
      ,[Flats].[Porch]
     ,[Flats].[Number] as flat_number
      ,[Flats].[Letter]
	  ,Places.Street_id as relation_obj_id
  FROM [dbo].[Flats]
	  left join Houses on Houses.Id = Flats.Houses_ID
	  left join Streets on Streets.Street_id = Houses.Street_id
	  left join Places on Places.Street_id = Houses.Id
	where Flats.Id = @Id 