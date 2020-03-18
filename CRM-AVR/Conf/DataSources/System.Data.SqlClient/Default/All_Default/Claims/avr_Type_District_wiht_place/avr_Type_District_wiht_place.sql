select 
        Place_types.Id
        ,Place_types.Name
        ,Districts.Id as district_id
		,Districts.Name as district
		,concat(Places.Lattitude , ' , ' , Places.Longitude) as coordinates
	from Places
		left join Place_types on Place_types.Id = Places.Place_type_ID
		left join Districts on Districts.Id = Places.District_ID
	where Places.Id = @place_id