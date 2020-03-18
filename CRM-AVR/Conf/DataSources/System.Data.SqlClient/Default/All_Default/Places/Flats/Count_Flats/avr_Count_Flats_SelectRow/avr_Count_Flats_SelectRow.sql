SELECT   [Flats].[Id]
	    ,Houses.Name as houses_name
		,Houses.Id as houses_id
		,Flats.Number
	    ,Places.Street_id as hous_id
  FROM [dbo].[Flats]
	  left join Houses on Houses.Id = Flats.Houses_ID
	  left join Places on Places.Street_id = Houses.Id
	where Flats.Id = @Id 