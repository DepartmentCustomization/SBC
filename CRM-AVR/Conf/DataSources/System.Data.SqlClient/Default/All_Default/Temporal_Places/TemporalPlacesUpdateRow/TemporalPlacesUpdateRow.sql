UPDATE dbo.[Places] 
	SET [Place_type_ID] = @place_type_id,
		[District_ID] = @place_district_id,
		[Lattitude] = @Lattitude,
		[Longitude] = @Longitude,
		[Street_id] = @place_street1_id
	WHERE Id = @Id ;

	---> собрать поле Name
DECLARE @placeName NVARCHAR(200);
IF(@place_type_id = 19)
BEGIN
SET @placeName = (SELECT TOP 1
						s.[Name] + N' ' + st.AbbrU + N'/' 
				  FROM dbo.[Places] t 
				  INNER JOIN dbo.[Streets] s ON s.Id = t.Street_id
				  INNER JOIN dbo.[Street_Type] st ON st.TypeId = s.Street_type_id
				  WHERE s.Id = @place_street1_id )  
				  + IIF(
				  (@place_street2_id IS NOT NULL), 
				  (SELECT TOP 1
						s.[Name] + N' ' + st.AbbrU
				  FROM dbo.[Places] t 
				  INNER JOIN dbo.[Streets] s ON s.Id = t.Street_id
				  INNER JOIN dbo.[Street_Type] st ON st.TypeId = s.Street_type_id
				  WHERE s.Id = @place_street2_id ), 
				  SPACE(0)) ;

		UPDATE dbo.Places 
			SET [Name] = @placeName 
		WHERE Id = @Id ;
END

ELSE IF(@place_type_id <> 19)
BEGIN
SET @placeName = (SELECT TOP 1
						s.[Name] + N' ' + st.UkrName  
						+ ISNULL( N', ' + @Number,N'') 
						+ ISNULL(@Letter,N'') 
				  FROM dbo.[Places] t 
				  INNER JOIN dbo.[Streets] s ON s.Id = t.Street_id
				  INNER JOIN dbo.[Street_Type] st ON st.TypeId = s.Street_type_id
				  WHERE s.Id = @place_street1_id ) ;

		UPDATE dbo.Places 
			SET [Name] = @placeName 
		WHERE Id = @Id ;
END