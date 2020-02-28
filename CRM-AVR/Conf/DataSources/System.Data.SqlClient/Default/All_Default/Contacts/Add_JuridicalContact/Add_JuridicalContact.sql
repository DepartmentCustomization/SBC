 DECLARE @info TABLE (contID INT);

--   DECLARE @UR_FirstName NVARCHAR(80) = 'Іван';
--   DECLARE @UR_MiddleName NVARCHAR(80) = 'Петрович';
--   DECLARE @UR_Surname NVARCHAR(80) = 'Бороденко';
--   DECLARE @NewPhone NVARCHAR(12) = '0998930091';
--   DECLARE @OrgID INT = 65169;

     IF
     (@UR_Surname IS NOT NULL) 
	 AND 
     (@OrgID IS NOT NULL)

     BEGIN 
	 DECLARE @OrgName NVARCHAR(500) = (SELECT [Name] FROM Organizations WHERE Id = @OrgID);
        --- Добавить в контакты 
         INSERT INTO dbo.Contacts
         (Contact_type_ID,
          First_name,
     	  Middle_name,
     	  Surname,
          [Name],
     	  Organisation_ID )
     OUTPUT inserted.Id INTO @info
     VALUES (
             2,
     		@UR_FirstName,
     		@UR_MiddleName,
     		@UR_Surname,
			@OrgName + N'  (' + @UR_Surname +
			CASE 
			--- Если имя есть и отчество тоже
			WHEN 
			@UR_MiddleName IS NOT NULL
			AND 
			@UR_FirstName IS NOT NULL 
			THEN 
			N' ' + SUBSTRING(@UR_FirstName,1,1) + N'. ' + SUBSTRING(@UR_MiddleName,1,1) + N'.)'
			--- Если имя есть а отчества нету
			WHEN @UR_MiddleName IS NULL 
			AND @UR_FirstName IS NOT NULL
			THEN N' ' + @UR_FirstName + N')' 
			--- Если имени нету а отчество есть
			WHEN 
			@UR_MiddleName IS NOT NULL
			AND 
			@UR_FirstName IS NULL
			THEN 
			N' ' + @UR_MiddleName + N')'
			--- Если не пусто только фамилия
			WHEN 
			@UR_FirstName IS NULL
			AND
			@UR_MiddleName IS NULL 
			THEN N')'
			END,
     		@OrgID )
     --- Записать айдишку нового контакта в переменную 
     DECLARE @ContactID INT = (SELECT contID FROM @info);
     --- И добавить в организации    (если надо)
     --        INSERT INTO dbo.Organizations
     --    	 ([Name],
			  --Contacts_ID,
			  --Is_WC,
			  --Is_activ,
			  --Is_selected,
     --         is_External_service )
     --  VALUES (
	    --       @OrgName + N'  (' + @UR_Surname + N' ' +
			  -- CASE 
			  -- WHEN @UR_MiddleName IS NOT NULL 
			  -- THEN SUBSTRING(@UR_FirstName,1,1) + N'. ' + SUBSTRING(@UR_MiddleName,1,1) + N'.)' 
			  -- WHEN @UR_MiddleName IS NULL 
			  -- THEN @UR_FirstName + N')' 
			  -- END,
			  -- @ContactID,
			  -- -1,
			  -- 1,
			  -- 0,
			  -- 1 )

	--- Также требуется внести в телефоны контактов 
	IF(@NewPhone IS NOT NULL)
	BEGIN
	INSERT INTO dbo.Contact_phones
	            (Contact_ID,
				 Number,
				 [Name] )
	 VALUES(
	        @ContactID,
			@NewPhone,
			CASE 
			--- Если имя есть и отчество тоже
			WHEN 
			@UR_MiddleName IS NOT NULL
			AND 
			@UR_FirstName IS NOT NULL 
			THEN @UR_Surname + N' ' +
			SUBSTRING(@UR_FirstName,1,1) + N'. ' + SUBSTRING(@UR_MiddleName,1,1) + N'.'
			 
			WHEN @UR_MiddleName IS NULL 
			AND @UR_FirstName IS NOT NULL
			THEN @UR_Surname + N' ' + @UR_FirstName  
			--- Если имя есть а отчества нету
			WHEN 
			@UR_MiddleName IS NOT NULL
			AND 
			@UR_FirstName IS NULL
			THEN 
			@UR_Surname + N' ' + @UR_MiddleName
			--- Если не пусто только фамилия
			WHEN 
			@UR_FirstName IS NULL
			AND
			@UR_MiddleName IS NULL 
			THEN @UR_Surname 

			END )
	END

	SELECT 
	c.Id,
	c.[Name],
	cp.Id,
	cp.Number
	
	FROM Contacts c
	LEFT JOIN Contact_phones cp ON c.Id = cp.Contact_ID
	WHERE c.Id = @ContactID

END