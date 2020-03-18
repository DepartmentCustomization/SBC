SELECT [Places].[Id]
      ,Place_types.Name as place_type_name
      ,Districts.Name as distinct_name
      ,[Places].[Name]
  FROM [dbo].[Places]
	left join Place_types on Place_types.Id = Places.Place_type_ID
	left join Districts on Districts.Id = Places.District_ID
	WHERE 
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only