SELECT [Places].[Id]
	  ,Districts.Name as distincts_name
	  ,Place_types.Name as place_types_name
	  ,[Places].[Name] as places_name
      ,concat(Street_Type.UkrName,' ', Streets.Name) as streets_name
  FROM [dbo].[Places]
	left join Place_types on Place_types.Id = Places.Place_type_ID
	left join Districts on Districts.Id = Places.District_ID
	left join Houses on Houses.Id = Places.Street_id
	left join Streets on Streets.Street_id = Houses.Street_id
	left join Street_Type on Street_Type.TypeId = Streets.Street_type_id
	where 
	#filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only