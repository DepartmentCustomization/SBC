/*
DECLARE @Id INT = 1;

DECLARE @type INT = 19;

DECLARE @district INT = 10;

DECLARE @street1 INT = 4829;

DECLARE @street2 INT = 2951;

DECLARE @Number NVARCHAR(20);

DECLARE @Letter NVARCHAR(20);

DECLARE @Lattitude NVARCHAR(50);

DECLARE @Longitude NVARCHAR(50);

DECLARE @Name NVARCHAR(200);

DECLARE @userId NVARCHAR(128) = N'0022a2aa-facd-4b2b-bade-f4ddcc7a0c53';
*/

IF(@type = 19) 
BEGIN 
SET @Name = (SELECT TOP 1
						s.[Name] + N' ' + st.AbbrU + N'/' 
				  FROM dbo.[Places] t 
				  INNER JOIN dbo.[Streets] s ON s.Id = t.Street_id
				  INNER JOIN dbo.[Street_Type] st ON st.TypeId = s.Street_type_id
				  WHERE s.Id = @street1 )  
				  + 
				  (SELECT TOP 1
						s.[Name] + N' ' + st.AbbrU 
				  FROM dbo.[Places] t 
				  INNER JOIN dbo.[Streets] s ON s.Id = t.Street_id
				  INNER JOIN dbo.[Street_Type] st ON st.TypeId = s.Street_type_id
				  WHERE s.Id = @street2 ) ;

DECLARE @crossInfo TABLE (Id INT);

INSERT INTO
	dbo.[CrossSTR] (
		[Name],
		[Streets_1_ID],
		[Streets_2_ID]
	) OUTPUT inserted.Id INTO @crossInfo(Id)
VALUES
(@Name, @street1, @street2);

DECLARE @newCrossID INT = (
	SELECT
		TOP 1 Id
	FROM
		@crossInfo
);

DECLARE @placeInfo TABLE (Id INT);

UPDATE
	dbo.[Places]
SET
	[Name] = @Name,
	[Longitude] = @Longitude,
	[Lattitude] = @Lattitude,
	[Cross_id] = @newCrossID,
	[Street_id] = NULL,
	[Is_Active] = 1
WHERE
	[Id] = @Id;

END
ELSE IF (@type <> 19) 
BEGIN
SET @Name = (SELECT TOP 1
						s.[Name] + N' ' + st.UkrName  
						+ ISNULL( N', ' + @Number,N'')
						+ ISNULL(@Letter,N'')
				  FROM dbo.[Places] t 
				  INNER JOIN dbo.[Streets] s ON s.Id = t.Street_id
				  INNER JOIN dbo.[Street_Type] st ON st.TypeId = s.Street_type_id
				  WHERE s.Id = @street1 );

DECLARE @Street1_Street_Id INT = (SELECT Street_Id FROM dbo.Streets WHERE Id = @street1);

DECLARE @HouseNum NVARCHAR(200);
DECLARE @HouseLetter NVARCHAR(10);

DECLARE @SlashIndex SMALLINT = CHARINDEX(N'/', @Name);
DECLARE @PointerIndex SMALLINT = CHARINDEX(N',', @Name);
DECLARE @DiffVal SMALLINT = @SlashIndex - (@PointerIndex + 1);

 IF(@SlashIndex <> 0)
 BEGIN
	SET @HouseNum = SUBSTRING(@Name, @PointerIndex+2, @DiffVal-1)
	SET @HouseLetter = SUBSTRING(@Name, @SlashIndex, LEN(@Name));
 END

 ELSE IF (@SlashIndex = 0)
 BEGIN
 DECLARE @NumCharIndex SMALLINT;
 SET @HouseNum = @Name;
 WHILE Patindex('%[^0-9]%', @HouseNum) <> 0 
 BEGIN 
	SET @HouseNum = Stuff(@HouseNum, Patindex('%[^0-9]%',@HouseNum),1, '');
 END 
	SET @NumCharIndex = CHARINDEX(@HouseNum, @Name) + LEN(@HouseNum)-1;
	SET @HouseLetter = IIF(
						-- if empty
						SUBSTRING(@Name, @NumCharIndex + LEN(@NumCharIndex)-1, LEN(@Name)) = SPACE(0), 
						NULL, 
						-- else 
						SUBSTRING(@Name, @NumCharIndex + LEN(@NumCharIndex)-1, LEN(@Name)));
END

SET @Number = @HouseNum;

UPDATE
	dbo.[Houses]
SET
		[Street_id] = @Street1_Street_Id,
		[Number] = @Number,
		[Letter] = @HouseLetter,
		[Name] = @Name,
		[District_id] = @district,
		[Longitude] = @Longitude,
		[Latitude] = @Lattitude,
		[Is_Active] = 1
WHERE Id = (SELECT Street_id FROM dbo.Places WHERE Id = @Id);  

UPDATE
	dbo.[Places]
SET
	[District_ID] = @district,
	[Name] = @Name,
	[Lattitude] = @Lattitude,
	[Longitude] = @Longitude,
	[Is_Active] = 1
WHERE
	[Id] = @Id;

END

UPDATE
	dbo.[Places_LOG]
SET
	[Place_type_ID] = @type,
	[Name] = @Name,
	[Update_by] = @userId,
	[Update_date] = GETUTCDATE(),
	[Action] = N'Active'
WHERE
	[Place_ID] = @Id;

SELECT
	N'OK' AS result;