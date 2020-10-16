IF @place_types_id NOT IN (10, 19, 6) 
BEGIN 
	IF @place_types_id = @place_types_id_ch 
	BEGIN 
		RAISERROR (N'Типи співпадають', 16, 1);
		RETURN;
	END
ELSE 
BEGIN
UPDATE
	[dbo].[Places]
SET
	Place_type_ID = isnull(@place_types_id_ch, @place_types_id),
	Lattitude = @Latitude,
	Longitude = @Longitude,
	District_ID = @distincts_id,
	Comment = @Comment
WHERE
	Id = @Id;
	
UPDATE
	[dbo].[Houses]
SET
	Longitude = @Longitude,
	Latitude = @Latitude,
	District_id = @distincts_id
WHERE
	Id = (
		SELECT
			Street_id
		FROM
			Places
		WHERE
			id = @Id
	);
END
END 
IF @place_types_id IN (10, 19, 6) 
BEGIN
UPDATE
	[dbo].[Places]
SET
	Lattitude = @Latitude,
	Longitude = @Longitude,
	District_id = @distincts_id
WHERE
	Id = @Id;
END