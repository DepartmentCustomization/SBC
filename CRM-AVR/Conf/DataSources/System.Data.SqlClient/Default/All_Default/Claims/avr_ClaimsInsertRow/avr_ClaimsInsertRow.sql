DECLARE @output TABLE ([Id] INT);

DECLARE @contact_id INT;
DECLARE @contact_id_fiz INT; 

IF @contact_type = 3 
BEGIN
SET
	@contact_id = @EM_contact_fio ;
SET
	@contact_id_fiz = @EM_org_id ;
END 
IF @contact_type = 2 
BEGIN
SET
	@contact_id = (
		SELECT
			Contacts_ID
		FROM
			dbo.Organizations 
		WHERE
			Id = @UR_organization_id
	);

SET
	@contact_id_fiz = @UR_contact_fio ;
END IF @contact_type = 1 
BEGIN
SET
	@contact_id = @FIZ_concact_id ;
SET
	@contact_id_fiz = NULL ;
END
 BEGIN TRY
  BEGIN TRANSACTION;

INSERT INTO
	[dbo].[Claims] (
		[First_claim_type_ID],
		[Claim_type_ID],
		[First_description],
		[Description],
		[Status_ID],
		[Response_organization_ID],
		[Created_at],
		[Plan_start_date],
		[Plan_finish_at],
		[Priority],
		[Report_action_id],
		Fact_finish_at,
		Diameters_ID,
		Is_Template,
		[User],
		Contact_ID,
		Contact_ID_Fiz,
		date_check,
		not_balans,
		DisplayID
	) output [inserted].[Id] INTO @output([Id])
VALUES
	(
		@Types_id,
		@Types_id,
		@Description,
		@Description,
		@Status_id,
		isnull(@Organization_id, 28),
		getutcdate() --@Created_at
,
		@Plan_start_date,
		isnull(
			@Plan_finish_at,
			(DATEADD(DAY, 14, @Plan_start_date))
		),
		@Priority,
		@Report_action_id,
		@Fact_finish_at,
		@Diameters_ID,
		@Is_Template,
		@User,
		@contact_id,
		@contact_id_fiz,
		@date_check,
		@not_balans,
		1
	) ;
DECLARE @Claim_Number INT;

SET
	@Claim_Number = (
		SELECT
			TOP 1 [Id]
		FROM
			@output
	);

UPDATE
	[dbo].[Claims]
SET
	Claim_Number = @Claim_Number,
	[Claim_class_ID] = (
		SELECT
			[Claim_class_ID]
		FROM
			[dbo].[Claim_types]
		WHERE
			Claim_types.Id = @Types_id
	),
	[Priority] = isnull(
		@Priority,
		isnull(
			(
				SELECT
					[Priority]
				FROM
					[dbo].[Claim_types]
				WHERE
					Claim_types.Id = @Types_id
			),
			5
		)
	)
WHERE
	Id = @Claim_Number;

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
		@Claim_Number,
		@places_id,
		@flat_number,
		1,
		getutcdate()
	) ;
IF @type_employee_2 = 5
	OR @type_employee_2 = 6
	OR @type_employee_2 = 8
	OR @type_employee_2 = 15 
BEGIN
INSERT INTO
	[dbo].[Claim_content] (
		[Claim_Id],
		[Sked],
		[TU],
		[TU_Id],
		[Letter],
		[L_Contacts_Id],
		[Gravamen],
		[G_Left],
		[G_PIB],
		Contact_insp_PIB,
		Contact_insp_phone
	)
VALUES
	(
		@Claim_Number,
		@Sked,
		@TU,
		@TU_Id,
		@Letter,
		@L_Contacts_Id,
		@Gravamen,
		@G_Left,
		@G_PIB,
		@x_pib_inspector,
		@x_phone_inspector
	);
END 
COMMIT TRANSACTION;

SELECT
	@Claim_Number AS [Id];

RETURN;

END TRY 
BEGIN CATCH 
IF @@TRANCOUNT > 0 
BEGIN 
ROLLBACK TRANSACTION;
END
DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();

SELECT
	N'Помилка заповнення: ' + @ErrorMessage ;
END CATCH 
; 