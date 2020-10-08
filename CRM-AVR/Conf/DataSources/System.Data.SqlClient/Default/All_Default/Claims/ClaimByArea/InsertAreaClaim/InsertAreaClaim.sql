/* test params
 
 DECLARE @Claim_type_ID INT = 7100;
 DECLARE @Claim_class_ID INT = 21;
 DECLARE @Description NVARCHAR(MAX) = 'ГО НА ОБХОД';
 DECLARE @Status_id INT = 1; 
 DECLARE @Organization_id INT = NULL;
 DECLARE @User NVARCHAR(128) = '7ddf9e9f-2a7b-4b81-9b5d-528722558bd6';
 DECLARE @Sked NVARCHAR(100) = 'Зима 2020';
 DECLARE @RouteID INT = 46;
 */

DECLARE @info TABLE (Id INT);

BEGIN TRY 
BEGIN TRANSACTION;
INSERT INTO
	[dbo].[Claims] (
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
DECLARE @DateCurrent DATE =  getdate(); 
/*N'2021-09-01'*/
--select cast(rtrim(year(@DateCurrent))+N'-09-01' as date),cast(rtrim(year(@DateCurrent)+1)+N'-09-01' as date)

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

UPDATE
	[dbo].[Claims]
SET
	[Claim_Number] = @Claim_Number,
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

SELECT
	N'Помилка заповнення: ' + @ErrorMessage;
END CATCH;