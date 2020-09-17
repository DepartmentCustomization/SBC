-- DECLARE @claim_ID INT = 9195;

DECLARE @IsError TINYINT = 0;
DECLARE @skipCheck BIT;
DECLARE @ClaimType_FullName NVARCHAR(MAX); 

SELECT 
	@ClaimType_FullName = ct.[Full_Name]
FROM dbo.Claims cl
INNER JOIN dbo.Claim_types ct ON ct.Id = cl.Claim_type_ID
WHERE cl.Id = @claim_ID;				
--> При наличии "Благоустрій" в типе заявки проверку не делать
SELECT 
	@skipCheck = 
	IIF(CHARINDEX(N'Благоустрій',@ClaimType_FullName,1) > 0, 1, 0);

IF (@skipCheck = 0)
BEGIN
	DECLARE @Claim_DigUp BIT;

	DECLARE @DigUp_action TABLE (Id INT);
	INSERT INTO @DigUp_action
	SELECT 
		[Id]
	FROM dbo.[Action_types]
	WHERE [Name] LIKE N'%Розриття%';

	DECLARE @Swamp_action TABLE (Id INT);
	INSERT INTO @Swamp_action
	SELECT 
		[Id]
	FROM dbo.[Action_types]
	WHERE [Name] LIKE N'%Засипка%';

	--> В заявке есть работы по разрытию ?
	SELECT 
		@Claim_DigUp = 
		IIF(COUNT(1) > 0, 1, 0)
	FROM dbo.[Actions] a
	INNER JOIN dbo.[Action_type_Place_type] at_pt ON a.[Action_type_ID] = at_pt.[Id]
	WHERE Claim_ID = @claim_ID
	AND [Do_not] <> 1
	AND at_pt.[Action_type_ID] IN (SELECT [Id] FROM @DigUp_action);

	--> Если да, то есть ли работы по засыпке ?
	IF (@Claim_DigUp = 1)
	BEGIN
		DECLARE @Claim_Swamp BIT;

		SELECT 
			@Claim_Swamp = 
			IIF(COUNT(1) > 0, 1, 0)
		FROM dbo.[Actions] a
		INNER JOIN dbo.[Action_type_Place_type] at_pt ON a.[Action_type_ID] = at_pt.[Id]
		WHERE Claim_ID = @claim_ID
		AND [Do_not] <> 1
		AND at_pt.[Action_type_ID] IN (SELECT [Id] FROM @Swamp_action);
		--> Если по засыпке нет, а по раскопке да, то ошибка !
		IF (@Claim_Swamp = 0)
		BEGIN
			SET @IsError = 1;
		END
	END
	SELECT 
		@IsError AS Result;
END
ELSE IF (@skipCheck = 1)
BEGIN
	SELECT 
		@IsError AS Result;
END