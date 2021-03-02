
DECLARE @output TABLE ([Id] INT);

DECLARE @contact_id INT;

DECLARE @contact_id_fiz INT;

declare @DateCurrent date =  getdate() /*N'2021-09-01'*/

DECLARE @Claim_Number INT;
if @DateCurrent >=  cast(rtrim(year(@DateCurrent))+N'-01-01' as date) and @DateCurrent < cast(rtrim(year(@DateCurrent)+1)+N'-01-01' as date)
begin
	if (SELECT count(1)
	FROM [CRM_AVR_Analitics].[dbo].[Claims]
	where CHARINDEX(N'/', [Claim_Number]) = 0
	and [Claim_Number] is not null
	and cast(Created_at as date) >=  cast(rtrim(year(@DateCurrent))+N'-01-01' as date) and cast(Created_at as date) < cast(rtrim(year(@DateCurrent)+1)+N'-01-01' as date)
	) = 0
	begin
		set @Claim_Number = 1;
	end
	else
	begin
		set @Claim_Number = (
								SELECT top 1 cast([Claim_Number] as int)+1
								FROM [CRM_AVR_Analitics].[dbo].[Claims]
								where CHARINDEX(N'/', [Claim_Number]) = 0
								and [Claim_Number] is not null
								and cast(Created_at as date) >=  cast(rtrim(year(@DateCurrent))+N'-01-01' as date) and cast(Created_at as date) < cast(rtrim(year(@DateCurrent)+1)+N'-01-01' as date)
								order by cast([Claim_Number] as int) desc
							)
	end
end

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

--> Id квартиры по номеру и месту
DECLARE @flat_id INT = IIF(
						@flat_number IS NOT NULL,
						(SELECT
							flat.Id
						FROM dbo.[Places] place
						INNER JOIN dbo.[Houses] house ON house.Id = place.Street_id
						INNER JOIN dbo.[Flats] flat ON flat.Houses_ID = house.Id 
						WHERE place.Id = @places_id
						AND flat.Number = @flat_number),
						NULL);

--> Если нужной нету то добавить значения
IF(@flat_id IS NULL) 
AND 
(@flat_number IS NOT NULL) 
AND 
(@IsClaimPlaceTemporary <> 1)
BEGIN
DECLARE @count INT;

EXEC PlaceNewApartments
    @places_id = @places_id,
	@flat_number = @flat_number,
    @new_flat_id = @flat_id OUTPUT;

END

IF @contact_type = 3 
BEGIN
SET
	@contact_id = @EM_contact_fio;

SET
	@contact_id_fiz = @EM_org_id;
END 

IF @contact_type = 1 
BEGIN
SET
	@contact_id = @FIZ_concact_id;

SET
	@contact_id_fiz = NULL;
END 

BEGIN TRY 
BEGIN TRANSACTION;

INSERT INTO
	[dbo].[Claims] (
		[Claim_Number],
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
		DisplayID,
		UR_organization_ID
	) OUTPUT [inserted].[Id] INTO @output([Id])
VALUES
	(
		@Claim_Number,
		@Types_id,
		@Types_id,
		@Description,
		@Description,
		@Status_id,
		isnull(@Organization_id, 28),
		getutcdate(),
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
		IIF(@contact_type = 2, NULL, @contact_id),
		IIF(@contact_type = 2, NULL, @contact_id_fiz),
		@date_check,
		@not_balans,
		1,
		@UR_organization_id
	);
	/*изменение района в таблицах начало*/
	update [dbo].[Places]
  set [District_ID]=@district_id
  where Id=@places_id

  update [dbo].[Houses]
  set [District_id]=@district_id
  from [dbo].[Houses]
  inner join [dbo].[Places] on [Houses].Id=[Places].Street_id
  where [Places].Id=@places_id
	/*изменение района в таблицах конец*/


/* Расчет номера исходя из 1го Сентября 
1го сентября нужно чтобі начинался номер заявки с "1"
*/
declare @ClaimId int = (SELECT TOP 1 [Id] FROM @output)


--select cast(rtrim(year(@DateCurrent))+N'-09-01' as date),cast(rtrim(year(@DateCurrent)+1)+N'-09-01' as date)



--select @Claim_Number


UPDATE
	[dbo].[Claims]
SET
	--Claim_Number = @Claim_Number,
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
	Id = @ClaimId;

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
		@ClaimId,
		@places_id,
		@flat_id,
		1,
		getutcdate()
	);


IF(@IsClaimPlaceTemporary = 1) 
BEGIN
UPDATE
	dbo.Places_LOG
SET
	[Object] += N' ' + CAST(@ClaimId AS NVARCHAR(20))
WHERE
	Place_ID = @places_id;
END 
IF(@contact_type = 2) 
BEGIN
INSERT INTO
	dbo.Claim_content (
		Claim_Id,
		G_PIB,
		UR_organization,
		Phone
	)
VALUES
	(
		@ClaimId,
		@UR_contact_fio,
		@UR_organization,
		@UR_number
	);

END 

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
		@ClaimId,
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
	@ClaimId AS [Id];

RETURN;

END TRY 
BEGIN CATCH 
IF @@TRANCOUNT > 0 
BEGIN 
ROLLBACK TRANSACTION;
END
DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
SELECT
	N'Помилка заповнення: ' + @ErrorMessage;
END CATCH;