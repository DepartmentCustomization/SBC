select   Places.Id
        ,Places.Name
	from Claims 
		left join Claim_Order_Places cop on Claims.id = cop.Claim_ID
		left join Places on Places.Id = cop.Place_ID
		where Claims.Id = @claim_ID
		and cop.Is_first_place = 1