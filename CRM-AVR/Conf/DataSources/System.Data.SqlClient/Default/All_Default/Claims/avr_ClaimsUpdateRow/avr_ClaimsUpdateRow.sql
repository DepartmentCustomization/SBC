DECLARE @contact_id INT;
DECLARE @contact_id_fiz INT;

IF(SELECT 
		[Name] 
	FROM dbo.Organizations 
	WHERE Id = @Organization_id) = N'Зовнішній КЦ' 
BEGIN 
SET @Organization_id = 28 ;
END

 IF (
	SELECT
		Status_id
	FROM
		dbo.Claims
	WHERE
		Id = @Id 
) IN (1, 2, 3, 11) 

BEGIN 

IF @contact_type = N'3' 
BEGIN
SET
	@contact_id = @EM_contact_fio ;
SET
	@contact_id_fiz = @EM_org_id ;
END 

IF @contact_type = N'2' 
BEGIN 
SET  @contact_id = NULL ;  
SET
	@contact_id_fiz = NULL ;
END

IF @contact_type = N'1' 
BEGIN
SET
	@contact_id = @FIZ_concact_id ;
SET
	@contact_id_fiz = NULL ;
END

DECLARE @currentPlaceID INT = (SELECT Place_ID FROM dbo.[Claim_Order_Places] WHERE Claim_ID = @Id AND Is_first_place = 1);

UPDATE
	[dbo].[Claims]
SET
	[Claim_class_ID] = (
		SELECT
			Claim_class_ID
		FROM
			dbo.Claim_types 
		WHERE
			Id = @Types_id
	)
,
	[Claim_type_ID] = @Types_id,
	[Description] = @Description,
	[Status_ID] = @Status_id,
	[Response_organization_ID] = @Organization_id,
	[Plan_start_date] = @Plan_start_date,
	[Plan_finish_at] = isnull(
		@Plan_finish_at,
		(DATEADD(DAY, 14, @Plan_start_date))
	),
	[Priority] = @Priority,
	[Report_action_id] = @Report_action_id,
	Fact_finish_at = @Fact_finish_at,
	Diameters_ID = @Diameters_ID,
	Is_Template = @Is_Template,
	[User] = @User,
	Contact_ID = @contact_id,
	Contact_ID_Fiz = @contact_id_fiz,
	date_check = @date_check,
	not_balans = @not_balans
WHERE
	Id = @Id ;
	--  смена основного адреса
	IF(
		SELECT
			Place_ID
		FROM
			dbo.[Claim_Order_Places]
		WHERE
			Claim_ID = @Id
			AND Is_first_place = 1
	) <> @places_id 
BEGIN
UPDATE
	[dbo].[Claim_Order_Places]
SET
	[Is_first_place] = 0
WHERE
	Claim_ID = @Id
	AND Is_first_place = 1 ;

INSERT INTO
	[dbo].[Claim_Order_Places] (
		[Claim_ID],
		[Place_ID],
		[Flats_ID],
		[Is_first_place],
		Date_insert
	)
VALUES
	(
		@Id,
		@places_id,
		@flat_id,
		1,
		getutcdate()
	) ;
---> Замена временного места
DECLARE @IsClaimPlaceTemporary BIT = IIF(
	(
		SELECT
			Is_Active
		FROM
			dbo.[Places]
		WHERE
			Id = @places_id
	) <> 1,
	1,
	0
);
IF(SELECT Is_Active FROM dbo.[Places] WHERE Id = @currentPlaceID) <> 1
BEGIN
DELETE FROM dbo.[Claim_Order_Places]
WHERE Claim_ID = @Id 
AND Place_ID = @currentPlaceID;

DELETE FROM dbo.[Places_LOG]
WHERE Place_ID = @currentPlaceID;

DELETE FROM dbo.[Places] 
WHERE Id = @currentPlaceID;

IF(@IsClaimPlaceTemporary = 1) 
BEGIN
UPDATE
	dbo.Places_LOG
SET
	[Object] += N' ' + CAST(@Id AS NVARCHAR(20))
WHERE
	Place_ID = @places_id;
END 
END

END 
IF @Status_id IN (5, 6) 
BEGIN
UPDATE
	[dbo].[Claims]
SET
	Fact_finish_at = isnull(@Fact_finish_at, getutcdate())
WHERE
	Id = @Id ;
END
END 
DECLARE @finish_at DATETIME ;
SET
	@finish_at = (
		SELECT
			Plan_finish_at
		FROM
			dbo.Claims
		WHERE
			Id = @Id
	) ;
IF @Status_id IN (1, 2, 3, 4) 
BEGIN
UPDATE
	[dbo].[Claim_SwitchOff_Address]
SET
	[SwitchOff_finish] = isnull(SwitchOff_finish, @finish_at)
WHERE
	Claim_ID = @Id ;
END
ELSE 
BEGIN
UPDATE
	[dbo].[Claim_SwitchOff_Address]
SET
	[SwitchOff_finish] = @Fact_finish_at
WHERE
	Claim_ID = @Id
	AND SwitchOff_finish > @Fact_finish_at ;
END

IF @Fact_finish_at IS NOT NULL
AND @Status_id NOT IN (4, 5, 6) 
BEGIN
DECLARE @placeActivity TINYINT = (SELECT Is_Active FROM dbo.[Places] WHERE Id = @places_id);
IF(@placeActivity <> 1)
BEGIN
	RAISERROR(N'Адреса в заявці НЕ ПІДТВЕРДЖЕНА, будь ласка зв`яжіться з адміністратором ДІЗ', 16, 1);
	RETURN;
END
UPDATE
	[dbo].[Claims]
SET
	Status_ID = 5
WHERE
	Id = @Id ;
	 -- закрыть все виезды датой закрытия заявки
UPDATE
	dbo.Orders
SET
	Status_ID = 10,
	Closed_at = @Fact_finish_at,
	user_edit = @User,
	Finish_at_actions = isnull(Finish_at_actions, @Fact_finish_at),
	Finished_at = isnull(Finished_at, @Fact_finish_at)
WHERE
	Claim_ID = @Id
	AND Closed_at IS NULL ;
END