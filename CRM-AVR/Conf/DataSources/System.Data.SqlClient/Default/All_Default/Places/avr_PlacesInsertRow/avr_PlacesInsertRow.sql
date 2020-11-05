DECLARE @output TABLE ([Id] INT);
DECLARE @output2 TABLE ([Id] INT);
DECLARE @output3 TABLE ([Id] INT);
DECLARE @area_name NVARCHAR(200);
DECLARE @cross_name NVARCHAR(200);
DECLARE @cr_id INT;
DECLARE @place_id INT; 

IF @place_types_id NOT IN (10, 19, 6) 
BEGIN 
IF EXISTS (
	SELECT
		Street_id
	FROM
		[dbo].[Places]
	WHERE
		Street_id = @streets_id
)
AND EXISTS(
	SELECT
		Place_type_ID
	FROM
		[dbo].[Places]
	WHERE
		Street_id = @streets_id
		AND Place_type_ID = @place_types_id
)

BEGIN 
	RAISERROR (N'Місце все існує', 16, 1); 
RETURN;
END

ELSE 
BEGIN
INSERT INTO
	[dbo].[Places] (
		[Place_type_ID],
		[District_ID],
		[Name],
		[Lattitude],
		[Longitude],
		[Street_id],
		[Comment],
		[Is_Active]
	) output [inserted].[Id] INTO @output([Id])
SELECT
	@place_types_id,
	@distincts_id,
	Name,
	isnull(Latitude, @Latitude),
	isnull(Longitude, @Longitude),
	Id,
	@Comment,
	1
FROM
	[dbo].[Houses]
WHERE
	Id = @streets_id;

SET
	@place_id = (
		SELECT
			TOP 1 [Id]
		FROM
			@output
	);
UPDATE
	[dbo].[Houses]
SET
	District_id = @distincts_id
WHERE
	Id = (
		SELECT
			street_id
		FROM
			[dbo].[Places]
		WHERE
			Id = @place_id
	);
END
END 
IF @place_types_id = 19 
BEGIN
SET
	@cross_name = (
		(
			SELECT
				[Name]
			FROM
				[dbo].[Streets]
			WHERE
				[Street_Id] = @cross_str_id1
		) + ' / ' + (
			SELECT
				[Name]
			FROM
				[dbo].[Streets]
			WHERE
				[Street_Id] = @cross_str_id2
		)
	);
INSERT INTO
	[dbo].[CrossSTR] (
		[Name],
		[Streets_1_ID],
		[Streets_2_ID]
	) output [inserted].[Id] INTO @output2([Id])
VALUES
	(
		@cross_name,
		@cross_str_id1,
		@cross_str_id2
	);
SET
	@cr_id = (
		SELECT
			TOP 1 [Id]
		FROM
			@output2
	);

INSERT INTO
	[dbo].[Places] (
		[Place_type_ID],
		[Name],
		[Lattitude],
		[Longitude],
		[Cross_id],
		[District_ID],
		[Comment],
		[Is_Active]
	) output [inserted].[Id] INTO @output([Id])
VALUES
	(
		@place_types_id,
		@cross_name,
		@Latitude,
		@Longitude,
		@cr_id,
		@distincts_id,
		@Comment,
		1
	);
SET
	@place_id = (
		SELECT
			TOP 1 [Id]
		FROM
			@output
	);
END;

-- well
IF @place_types_id = 6 
BEGIN
SELECT
	@cross_name = [Name]
FROM
	[dbo].[Streets]
WHERE
	[Street_Id] = @cross_str_id1;

INSERT INTO
	[dbo].[CrossSTR] (
		[Name],
		[Streets_1_ID],
		[Streets_2_ID]
	) output [inserted].[Id] INTO @output2([Id])
VALUES
	(
		@cross_name,
		@cross_str_id1,
		@cross_str_id1
	);
SET
	@cr_id = (
		SELECT
			TOP 1 [Id]
		FROM
			@output2
	);

INSERT INTO
	[dbo].[Places] (
		[Place_type_ID],
		[Name],
		[Lattitude],
		[Longitude],
		[Cross_id],
		[District_ID],
		[Comment],
		[Is_Active]
	) output [inserted].[Id] INTO @output([Id])
VALUES
	(
		@place_types_id,
		@cross_name,
		@Latitude,
		@Longitude,
		@cr_id,
		@distincts_id,
		@Comment,
		1
	);
SET
	@place_id = (
		SELECT
			TOP 1 [Id]
		FROM
			@output
	);
END;

IF @place_types_id = 10 
BEGIN
SET
	@area_name = concat (
		(
			SELECT
				name
			FROM
				[dbo].[Houses]
			WHERE
				Id = @from_house
		),
		' / ',
		(
			SELECT
				name
			FROM
				[dbo].[Houses]
			WHERE
				Id = @to_house
		)
	);

INSERT INTO
	[dbo].[Area_House] ([Name], Houses_id, Houses2_id) output [inserted].[Id] INTO @output3([Id])
VALUES
	(
		@cross_name,
		@cross_str_id1,
		@cross_str_id2
	);

DECLARE @ar_id INT;

SET
	@ar_id = (
		SELECT
			TOP 1 [Id]
		FROM
			@output3
	);

INSERT INTO
	[dbo].[Places] (
		[Place_type_ID],
		[Name],
		[Area_Id],
		[District_ID],
		[Comment],
		[Is_Active]
	) output [inserted].[Id] INTO @output([Id])
VALUES
	(
		@place_types_id,
		@area_name,
		@ar_id,
		@distincts_id,
		@Comment,
		1
	);
SET
	@place_id = (
		SELECT
			TOP 1 [Id]
		FROM
			@output
	);
END;

SELECT
	@place_id AS Id;
	