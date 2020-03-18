IF @place_types_id not in (10,19,6)
BEGIN
	if @place_types_id  = @place_types_id_ch
	begin
		print 'Типи совпадають'
	end
	 else 
	begin
		update Places
		set
		  Place_type_ID = isnull(@place_types_id_ch, @place_types_id)
		 ,Lattitude = @Latitude
		 ,Longitude = @Longitude
		 ,District_ID = @distincts_id
		where Id = @Id

		update Houses
		set
		  Longitude = @Longitude
		 ,Latitude = @Latitude
		 ,District_id = @distincts_id
		where Id = (select Street_id from Places where id = @Id)
	end
END

IF @place_types_id in (10,19,6)
BEGIN
		update Places
		set
		  Lattitude = @Latitude
		 ,Longitude = @Longitude
		 ,District_id = @distincts_id
		where Id = @Id
END