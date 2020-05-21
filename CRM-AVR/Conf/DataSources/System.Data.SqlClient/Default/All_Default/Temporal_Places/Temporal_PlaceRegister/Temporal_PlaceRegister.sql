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
	[Cross_id] = @newCrossID,
	[Is_Active] = 1
WHERE
	[Id] = @Id;

END
ELSE IF (@type <> 19) 
BEGIN
INSERT INTO
	dbo.[Houses] (
		[Street_id],
		[Number],
		[Letter],
		[Name],
		[District_id],
		[Longitude],
		[Latitude]
	)
VALUES
(
		@street1,
		@Number,
		@Letter,
		@Name,
		@district,
		@Longitude,
		@Lattitude
	);

UPDATE
	dbo.[Places]
SET
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