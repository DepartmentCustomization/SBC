  select 
		 Places_in_places.Id
		,Places2.Name as places2_name
		    , Places2.Id as places2_id
		,Type_PP_link.Name as type_pp_link_name
		    ,Type_PP_link.Id as type_pp_link_id
	--	,Flats.Number
		,Places.Id as places_id
	from Places_in_places
    	left join Places on Places_in_places.Parent_place_id = Places.Id
    	left join Places Places2 on Places2.Id = Places_in_places.Child_place_id
    	left join Type_PP_link on Type_PP_link.Id = Places_in_places.Type_PP_link_ID
    	left join Houses on Houses.Id = Places2.Relation_obj_ID
    --	left join Flats on Flats.Houses_ID = Houses.Id
	where Places_in_places.Id = @Id