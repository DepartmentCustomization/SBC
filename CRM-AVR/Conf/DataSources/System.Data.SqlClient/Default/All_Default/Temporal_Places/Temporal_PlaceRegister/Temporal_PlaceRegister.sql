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

UPDATE
	dbo.[Houses]
SET
		[Street_id] = @Street1_Street_Id,
		[Number] = @Number,
		[Letter] = @Letter,
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