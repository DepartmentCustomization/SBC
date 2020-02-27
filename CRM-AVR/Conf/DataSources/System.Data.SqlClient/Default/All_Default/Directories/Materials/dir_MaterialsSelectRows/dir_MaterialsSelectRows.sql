SELECT 
	Materials.Id
	,Materials.Name
	,Materials.With_diameter
	,Units.Name as units_name
	FROM Materials
		left join Units on Units.Id = Materials.Units_Id 
WHERE
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only