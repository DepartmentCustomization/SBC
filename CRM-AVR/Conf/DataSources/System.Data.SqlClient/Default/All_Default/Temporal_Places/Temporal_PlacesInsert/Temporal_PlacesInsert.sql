/*
 DECLARE @Id INT = 100;
 DECLARE @type INT = 11;
 DECLARE @district INT = 10;
 DECLARE @street INT = 4829;
 DECLARE @Name NVARCHAR(200) = N'Праці бульвар, 555Ф';
 DECLARE @entity NVARCHAR(20) = N'Маршрут';
 DECLARE @userId NVARCHAR(128) = N'0022a2aa-facd-4b2b-bade-f4ddcc7a0c53';
 DECLARE @area INT = 169;
 */
 
 DECLARE @HouseNum NVARCHAR(200) = @Name;
 DECLARE @NumCharIndex SMALLINT;
 DECLARE @HouseLetter NVARCHAR(2);


DECLARE @UserFIO NVARCHAR(300) = (
	SELECT
		ISNULL(LastName, '') + ISNULL(N' ' + FirstName, '') + ISNULL(N' ' + Patronymic, '') + N'.'
	FROM
		[#system_database_name#].dbo.[User]
	WHERE
		UserId = @userId
);

SET
	XACT_ABORT ON;

BEGIN TRY 
BEGIN TRANSACTION;
DECLARE @Street_StreetId INT = (SELECT Street_Id FROM dbo.Streets WHERE Id = @street);
DECLARE @newCross TABLE (Id INT);
DECLARE @newHouse TABLE (Id INT);

IF(@type <> 19)
BEGIN
--> Get number
WHILE Patindex('%[^0-9]%', @HouseNum) <> 0 
BEGIN 
SET @HouseNum = Stuff(@HouseNum, Patindex('%[^0-9]%',@HouseNum),1, '');
END 
--> Get letter
SET @NumCharIndex = CHARINDEX(@HouseNum, @Name) + LEN(@HouseNum)-1;
SET @HouseLetter = SUBSTRING(@Name, @NumCharIndex + LEN(@NumCharIndex)-1, LEN(@Name));

INSERT INTO 
	dbo.[Houses] (
		[Street_id],
		[Number], 
		[Letter],
		[Name],
		[District_id],
		[Is_Active]
		) OUTPUT inserted.Id INTO @newHouse(Id)
VALUES
	(
		@Street_StreetId,
		@HouseNum,
		@HouseLetter,
		@Name,
		@district,
		2);

END 

DECLARE @newHouseID INT = (SELECT TOP 1 Id FROM @newHouse);

DECLARE @placeOut TABLE (Id INT);
INSERT INTO
	dbo.[Places] (
		[Place_type_ID],
		[District_ID],
		[Name],
		[Street_id],
		[Created_by],
		[Is_Active]
	) OUTPUT inserted.Id INTO @placeOut(Id)
VALUES
	(
		@type,
		@district,
		@Name,
		IIF(@type = 19,@street,@newHouseID),
		@userId,
		2
	);

DECLARE @placeId INT = (
	SELECT
		TOP 1 Id
	FROM
		@placeOut
);

INSERT INTO
	dbo.[Places_LOG] (
		[Place_ID],
		[Place_type_ID],
		[Name],
		[Created_by],
		[Created_date],
		[Action],
		[Object]
	)
VALUES
	(
		@placeId,
		@type,
		@Name,
		@userId,
		GETUTCDATE(),
		N'Add',
		@entity
	);

IF(@area IS NOT NULL) 
BEGIN 
DECLARE @logID INT = (
	SELECT
		TOP 1 Id
	FROM
		dbo.[Places_LOG]
	WHERE
		Place_ID = @placeId
);

DECLARE @RouteID INT = (
	SELECT
		RouteID
	FROM
		dbo.[Area]
	WHERE
		Id = @area
);

INSERT INTO
	dbo.[AreaObject] ([AreaID], [PlacesID])
VALUES
	(@area, @placeId);

UPDATE
	dbo.[Places_LOG]
SET
	[Object] += N' ' + CAST(@RouteID AS NVARCHAR(20))
WHERE
	Id = @logID;

END 
COMMIT TRANSACTION;

DECLARE @Title NVARCHAR(MAX) = N'Користувач запросив стоворення нового місця. ' + @UserFIO;

SELECT
	@placeId AS [Id],
	@Name AS [Name],
	@Title AS [Title];

END TRY 
BEGIN CATCH 
IF (XACT_STATE()) = -1 
BEGIN 
	DECLARE @Message NVARCHAR(MAX) = ERROR_MESSAGE();
	RAISERROR(@Message, 16, 1);
	ROLLBACK TRANSACTION;

END;
END CATCH;