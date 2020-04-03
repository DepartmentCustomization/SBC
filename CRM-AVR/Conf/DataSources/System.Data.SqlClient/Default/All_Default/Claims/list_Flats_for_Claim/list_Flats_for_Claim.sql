select Id, number from Flats
where Houses_ID =  (select Street_id from places where Id = @place_id)
and 	 
     #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only