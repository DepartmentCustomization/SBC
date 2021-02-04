
/*
 DECLARE @Claim_type_ID INT = 7100;
 DECLARE @Claim_class_ID INT = 21;
 DECLARE @Description NVARCHAR(MAX)-- = 'ГО НА ОБХОД';
 DECLARE @Status_id INT;-- = 1; 
 DECLARE @Response_organization_ID INT = 5502;
 DECLARE @User NVARCHAR(128) = '7ddf9e9f-2a7b-4b81-9b5d-528722558bd6';
 DECLARE @Sked NVARCHAR(100) --= 'Зима 2020';
 DECLARE @RouteID INT = 565-- 46;
 declare @WalkerJobID int =28036;
 */
/*
IF EXISTS (SELECT 
				c.Id 
		   FROM dbo.[Claims] c 
		   INNER JOIN dbo.[Claim_content] cc ON cc.Claim_Id = c.Id
			AND c.[User] = @User 
			AND cc.RouteID = @RouteID
			AND c.Response_organization_ID = ISNULL(@Response_organization_ID,28)
			AND c.Claim_class_ID = @Claim_class_ID
			AND c.Claim_type_ID = @Claim_type_ID
			AND DATEDIFF(MINUTE, DATEADD(MINUTE, -5, GETDATE()), c.Created_at) <= 5)
BEGIN
	RAISERROR(N'Така заявка вже створена менше ніж 5 хвилин назад',16,1);
	RETURN;
END*/

--
DECLARE @DateCurrent DATE =  getdate(); 

DECLARE @Claim_Number INT;
IF @DateCurrent >=  CAST(rtrim(year(@DateCurrent))+N'-01-01' AS DATE) AND @DateCurrent < CAST(rtrim(year(@DateCurrent)+1)+N'-01-01' AS DATE)
BEGIN
	IF (SELECT count(1)
	FROM [CRM_AVR_Analitics].[dbo].[Claims]
	WHERE CHARINDEX(N'/', [Claim_Number]) = 0
	AND [Claim_Number] IS NOT NULL
	AND CAST(Created_at AS DATE) >=  CAST(rtrim(year(@DateCurrent))+N'-01-01' AS DATE) AND CAST(Created_at AS DATE) < CAST(rtrim(year(@DateCurrent)+1)+N'-01-01' AS DATE)
	) = 0
	BEGIN
		SET @Claim_Number = 1;
	END
	ELSE
	BEGIN
		SET @Claim_Number = (
								SELECT TOP 1 CAST([Claim_Number] AS INT)+1
								FROM [CRM_AVR_Analitics].[dbo].[Claims]
								WHERE CHARINDEX(N'/', [Claim_Number]) = 0
								AND [Claim_Number] IS NOT NULL
								AND CAST(Created_at AS DATE) >= CAST(rtrim(year(@DateCurrent))+N'-01-01' AS DATE) AND CAST(Created_at AS DATE) < CAST(rtrim(year(@DateCurrent)+1)+N'-01-01' AS DATE)
								ORDER BY CAST([Claim_Number] AS INT) DESC
							);
	END
END

--select @Claim_Number
--


--Номер заявки    
IF (@Claim_Number IS NULL) 
BEGIN	
	RAISERROR(N'Не заповнене поле "Номер заявки"',16,1);
	RETURN;
END
--Статус нормально
--Дата реєстрації нормально
--Зареєсрував нормально

--Обхідник
IF (@WalkerJobID IS NULL) 
BEGIN	
	RAISERROR(N'Не заповнене поле "Обхідник"',16,1);
	RETURN;
END
--Відповідальний підрозділ - пусте або текст "невизначено"
IF (@Response_organization_ID IS NULL or @Response_organization_ID=28 /*невизначено*/) 
BEGIN	
	RAISERROR(N'Не заповнене поле "Відповідальний підрозділ"',16,1);
	RETURN;
END

--Маршрут №
IF (@RouteID IS NULL) 
BEGIN	
	RAISERROR(N'Маршрут вказано некоректно. Будь-ласка оберіть значення із списку',16,1);
	RETURN;
END

DECLARE @info TABLE (Id INT);
BEGIN TRY 
BEGIN TRANSACTION;
INSERT INTO
	[dbo].[Claims] (
		[Claim_Number],
		[First_claim_type_ID],
		[Claim_type_ID],
		Claim_class_ID,
		[First_description],
		[Description],
		[Status_ID],
		[Response_organization_ID],
		[Created_at],
		Is_Template,
		[User],
		[DisplayID]
	) OUTPUT [inserted].[Id] INTO @info(Id)
VALUES
	(
		@Claim_Number,
		@Claim_type_ID,
		@Claim_type_ID,
		@Claim_class_ID,
		@Description,
		@Description,
		ISNULL(@Status_id, 1),
		ISNULL(@Response_organization_ID, 28),
		GETUTCDATE(),
		0,
		@User,
		2
	);

DECLARE @Claim_Id INT = (
	SELECT
		TOP 1 Id
	FROM
		@info
);

/* Расчет номера исходя из 1го Сентября 
1го сентября нужно чтобы начинался номер заявки с "1"
*/

/*N'2021-09-01'*/
--select cast(rtrim(year(@DateCurrent))+N'-09-01' as date),cast(rtrim(year(@DateCurrent)+1)+N'-09-01' as date)



UPDATE
	[dbo].[Claims]
SET
	--[Claim_Number] = @Claim_Number,
	[Priority] = isnull(
		(
			SELECT
				[Priority]
			FROM
				[dbo].[Claim_types]
			WHERE
				Claim_types.Id = @Claim_type_ID
		),
		5
	)
WHERE
	Id = @Claim_Id;

INSERT INTO
	[dbo].[Claim_content] (
		[Claim_Id],
		[Sked],
		[RouteID]
	)
VALUES
	(
		@Claim_Id,
		@Sked,
		@RouteID
	);
	-- начало

DECLARE @WalkerName NVARCHAR(255) = (SELECT [Name] FROM dbo.Contacts WHERE Job_ID = @WalkerJobID) ;

   UPDATE 
   dbo.Claims
   SET [Status_ID] = 3 
   --OUTPUT inserted.Status_ID INTO @info(newStatus)
   WHERE Id = @Claim_Id ;

   UPDATE 
   dbo.Claim_content
   SET WalkerJobID = @WalkerJobID,
       WalkerName = @WalkerName
   WHERE Claim_Id = @Claim_Id ;
	--конец

COMMIT TRANSACTION;
SELECT
	@Claim_Id AS Id;

RETURN;

END TRY 
BEGIN 
CATCH 
IF @@TRANCOUNT > 0
BEGIN
	ROLLBACK TRANSACTION;
END
DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
RAISERROR(@ErrorMessage,16,1);
END CATCH;
--1


