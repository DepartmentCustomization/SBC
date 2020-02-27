select 
	 --Houses.Name as streets_name
	count(Flats.Number) as flats
FROM Places
	left join Houses on Houses.Id = Places.Street_id
	left join Flats on Flats.Houses_ID = Houses.Id
where Flats.Houses_ID =@Id_place
    and Places.Place_type_ID in (11,14)
    and #filter_columns#
        group by Houses.Name
     --#sort_columns#
--offset @pageOffsetRows rows fetch next @pageLimitRows rows only