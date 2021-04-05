/*
declare @Plan_start_date datetime
declare @EM_org_id int
declare @Is_Template bit='false'
declare @Description nvarchar(max)
declare @Status_id int=1
declare @UR_contact_fio int
declare @Id int=2655
declare @Types_id int=9222
declare @Diameters_ID int
declare @not_balans bit='false'
declare @Report_action_id int
declare @Priority nvarchar(max)=N'5'
declare @FIZ_concact_id int=null;
declare @date_check datetime
declare @User nvarchar(max) =N'29796543-b903-48a6-9399-4840f6eac396';
declare @EM_contact_fio int
declare @Fact_finish_at datetime= '2021-04-02 13:59:31.273';
declare @places_id int=42064
declare @flat_id int
declare @UR_organization_id int
declare @contact_type int
declare @Organization_id int =28;
declare @Plan_finish_at datetime;

--которых не хватает начало
declare @executor_id int= 105031;
declare @exec_phone int=6048
declare @exec_phone_hid nvarchar(max)
declare @add_phone nvarchar(max)
declare @district_id int
--которых не хватает конец
*/
  declare @contact_org_id int;
set @contact_org_id =
	(select [Contacts_ID]
  from [dbo].[Organizations]
  where Id=@executor_id)

IF @executor_id is null and @add_phone is not null
BEGIN
	RAISERROR(N'Додайте виконавня, для збереження номеру телефону', 16, 1);
	RETURN;
END

if not EXISTS (select Id from [dbo].[Contact_phones] where [Contact_ID]=@contact_org_id and [Number]=@add_phone)
and 
@add_phone is not null and @contact_org_id is not null
begin

  insert into [dbo].[Contact_phones]
  ([Contact_ID]
      ,[Number])
   select @contact_org_id, @add_phone

end

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
	not_balans = @not_balans,
	[ExternalOwnerID] = @executor_id
WHERE
	Id = @Id ;

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
			IF exists (select top 1 ct.Id from [Claim_types] ct 
			inner join [Claim_types] pct on ct.Parent_сlaim_types_ID=pct.Id
			where ct.[Parent_сlaim_types_ID]=@Types_id and pct.Is_delete='false')
				begin
					RAISERROR(N'Тип заявки не є останній', 16, 1);
				RETURN;
				end

			IF not exists (select top 1 Id
					  from [dbo].[Actions]
					  where [Is_Goal]='true' and [Claim_ID]=@Id)
				begin
					RAISERROR(N'Не відмічено Головну роботу в заявці.', 16, 1);
				RETURN;
				end
			IF @district_id is null
				begin
					RAISERROR(N'Не проставлен район в якому виконували заявку', 16, 1);
					RETURN;
				end

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