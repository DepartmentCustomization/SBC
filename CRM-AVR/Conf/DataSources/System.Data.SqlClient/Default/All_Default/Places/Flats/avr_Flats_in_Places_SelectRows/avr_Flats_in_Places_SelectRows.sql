select 
	 Flats.Id
	-- ,Flats.Id as fl_id
	 ,Houses.Name as houses_name
	,Flats.Number
	,Flats.Letter
	,Flats.Porch
	,Flats.Floor
FROM Flats
	left join Houses on Houses.Id = Flats.Houses_ID
	left join Places on Houses.Id = Places.Street_id
where Flats.Houses_ID = @Id_place
and Places.Place_type_ID in (11,14) --not in (1,2,3,4,5,6,7,8,9,10,12,13,19)
and #filter_columns#
	order by Flats.Number 
 
    -- #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only