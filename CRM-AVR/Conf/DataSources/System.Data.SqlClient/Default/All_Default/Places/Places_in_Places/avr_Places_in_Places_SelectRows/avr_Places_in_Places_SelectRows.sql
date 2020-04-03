  select distinct
		 Places_in_places.Id
		 ,case when Places_in_places.Parent_place_id = @Id then Places2.Name else Places.Name end as places_name
		,CASE   
			 WHEN Places_in_places.Child_place_id = @Id THEN Places.Id
			 WHEN Places_in_places.Parent_place_id = @Id THEN Places2.Id
         END  as places_id
		,Type_PP_link.Name as type_pp_link_name
	from Places_in_places
	left join Places on Places_in_places.Parent_place_id = Places.Id
	left join Places Places2 on Places2.Id = Places_in_places.Child_place_id
	left join Type_PP_link on Type_PP_link.Id = Places_in_places.Type_PP_link_ID
	left join Houses on Houses.Id = Places2.Relation_obj_ID
	left join Flats on Flats.Houses_ID = Houses.Id
	where Places_in_places.Child_place_id = @Id or Places_in_places.Parent_place_id= @Id
		and 
	#filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only