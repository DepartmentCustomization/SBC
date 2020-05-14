UPDATE dbo.[T_Places] 
	SET [Place_type_ID] = @place_type_id,
		[District_ID] = @place_district_id,
		[Lattitude] = @Lattitude,
		[Longitude] = @Longitude,
		[Streets_1_ID] = @place_street1_id,
		[Streets_2_ID] = @place_street2_id,
		[Number] = @Number,
		[Letter] = @Letter 
	WHERE Id = @Id ;

	---> Name
	UPDATE t
		SET [Name] = s1.[Name] + N' ' + st1.UkrName +
		IIF(s2.[Name] IS NOT NULL, 
		N'/' + s2.[Name] + N' ' + st2.UkrName,
		SPACE(0) ) + N', ' + 
		ISNULL(t.Number,N'') + 
		ISNULL(t.Letter,N'') 
	FROM dbo.[T_Places] t 
	INNER JOIN Streets s1 ON s1.Id = t.Streets_1_ID
	INNER JOIN Street_Type st1 ON st1.TypeId = s1.Street_type_id 
	LEFT JOIN Streets s2 ON s2.Id = t.Streets_2_ID
	LEFT JOIN Street_Type st2 ON st2.TypeId = s2.Street_type_id 
	WHERE t.Id = @Id ;