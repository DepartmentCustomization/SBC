--  DECLARE @applicant_id INT = 1490872;
--  DECLARE @type NVARCHAR(100) = N'Усі';
--  DECLARE @object_id INT = 8593;

IF object_id('tempdb..#ClaimsResult') IS NOT NULL
BEGIN
DROP TABLE #ClaimsResult;
END
CREATE TABLE #ClaimsResult ([Номер питання] NVARCHAR(50),
							[Стан питання] NVARCHAR(50),
							[Тип питання] NVARCHAR(250),
							[Виконавець] NVARCHAR(250),
							[Планова дата виконання] DATETIME,
							Id INT) WITH (DATA_COMPRESSION = PAGE);		
IF(@object_id IS NULL)
BEGIN
IF @type = N'Усі' 
BEGIN
INSERT INTO #ClaimsResult
SELECT
	[Lokal_copy_gorodok_claims].claim_number AS [Номер питання],
	[QuestionStates].[name] AS [Стан питання],
	[Lokal_copy_gorodok_claims].claims_type AS [Тип питання],
	[Lokal_copy_gorodok_claims].executor AS [Виконавець],
	[Lokal_copy_gorodok_claims].plan_finish_date AS [Планова дата виконання],
	[Lokal_copy_gorodok_claims].Id
FROM
	[CRM_1551_GORODOK_Integrartion].[dbo].[Gorodok_1551_houses] [Gorodok_1551_houses]
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[Lokal_copy_gorodok_claims] [Lokal_copy_gorodok_claims] ON [Lokal_copy_gorodok_claims].[object_id] = [Gorodok_1551_houses].gorodok_houses_id
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].Claims_states Claims_states ON Claims_states.[name] = [Lokal_copy_gorodok_claims].[status]
	LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON [QuestionStates].Id = Claims_states.[1551_state]
WHERE
	[Gorodok_1551_houses].[1551_houses_id] IN (
		SELECT
			[LiveAddress].building_id
		FROM
			[dbo].[LiveAddress]
		WHERE
			building_id IS NOT NULL
			AND [LiveAddress].applicant_id = @applicant_id
	);
END 
ELSE IF @type = N'Зареєстровано' 
BEGIN
INSERT INTO #ClaimsResult
SELECT
	[Lokal_copy_gorodok_claims].claim_number AS [Номер питання],
	[QuestionStates].[name] AS [Стан питання],
	[Lokal_copy_gorodok_claims].claims_type AS [Тип питання],
	[Lokal_copy_gorodok_claims].executor AS [Виконавець],
	[Lokal_copy_gorodok_claims].plan_finish_date AS [Планова дата виконання],
	[Lokal_copy_gorodok_claims].Id
FROM
	[CRM_1551_GORODOK_Integrartion].[dbo].[Gorodok_1551_houses] [Gorodok_1551_houses]
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[Lokal_copy_gorodok_claims] [Lokal_copy_gorodok_claims] ON [Lokal_copy_gorodok_claims].[object_id] = [Gorodok_1551_houses].gorodok_houses_id
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].Claims_states Claims_states ON Claims_states.[name] = [Lokal_copy_gorodok_claims].[status]
	LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON [QuestionStates].Id = Claims_states.[1551_state]
WHERE
	[Gorodok_1551_houses].[1551_houses_id] IN (
		SELECT
			[LiveAddress].building_id
		FROM
			[dbo].[LiveAddress]
		WHERE
			building_id IS NOT NULL
			AND [LiveAddress].applicant_id = @applicant_id
	)
	AND Claims_states.[1551_state] IN (
		SELECT
			[QuestionStates].Id
		FROM
			[QuestionStates]
		WHERE
			[QuestionStates].[name] IN (N'Зареєстровано')
	) ;
END 
ELSE IF @type = N'В роботі' 
BEGIN
INSERT INTO #ClaimsResult
SELECT
	[Lokal_copy_gorodok_claims].claim_number AS [Номер питання],
	[QuestionStates].[name] AS [Стан питання],
	[Lokal_copy_gorodok_claims].claims_type AS [Тип питання],
	[Lokal_copy_gorodok_claims].executor AS [Виконавець],
	[Lokal_copy_gorodok_claims].plan_finish_date AS [Планова дата виконання],
	[Lokal_copy_gorodok_claims].Id
FROM
	[CRM_1551_GORODOK_Integrartion].[dbo].[Gorodok_1551_houses] [Gorodok_1551_houses]
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[Lokal_copy_gorodok_claims] [Lokal_copy_gorodok_claims] ON [Lokal_copy_gorodok_claims].[object_id] = [Gorodok_1551_houses].gorodok_houses_id
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].Claims_states Claims_states ON Claims_states.[name] = [Lokal_copy_gorodok_claims].[status]
	LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON [QuestionStates].Id = Claims_states.[1551_state]
WHERE
	[Gorodok_1551_houses].[1551_houses_id] IN (
		SELECT
			[LiveAddress].building_id
		FROM
			[dbo].[LiveAddress]
		WHERE
			building_id IS NOT NULL
			AND [LiveAddress].applicant_id = @applicant_id
	)
	AND Claims_states.[1551_state] IN (
		SELECT
			[QuestionStates].Id
		FROM
			[QuestionStates]
		WHERE
			[QuestionStates].[name] IN (N'В роботі', N'На перевірці')
	) ;
END 
ELSE IF @type = N'Просрочено' 
BEGIN
INSERT INTO #ClaimsResult
SELECT
	[Lokal_copy_gorodok_claims].claim_number AS [Номер питання],
	[QuestionStates].[name] AS [Стан питання],
	[Lokal_copy_gorodok_claims].claims_type AS [Тип питання],
	[Lokal_copy_gorodok_claims].executor AS [Виконавець],
	[Lokal_copy_gorodok_claims].plan_finish_date AS [Планова дата виконання],
	[Lokal_copy_gorodok_claims].Id
FROM
	[CRM_1551_GORODOK_Integrartion].[dbo].[Gorodok_1551_houses] [Gorodok_1551_houses]
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[Lokal_copy_gorodok_claims] [Lokal_copy_gorodok_claims] ON [Lokal_copy_gorodok_claims].[object_id] = [Gorodok_1551_houses].gorodok_houses_id
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].Claims_states Claims_states ON Claims_states.[name] = [Lokal_copy_gorodok_claims].[status]
	LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON [QuestionStates].Id = Claims_states.[1551_state]
WHERE
	[Gorodok_1551_houses].[1551_houses_id] IN (
		SELECT
			[LiveAddress].building_id
		FROM
			[dbo].[LiveAddress]
		WHERE
			building_id IS NOT NULL
			AND [LiveAddress].applicant_id = @applicant_id
	)
	AND Claims_states.[1551_state] IN (
		SELECT
			[QuestionStates].Id
		FROM
			[QuestionStates]
		WHERE
			[QuestionStates].[name] NOT IN (N'Закрито')
	)
	AND [Lokal_copy_gorodok_claims].[plan_finish_date] <= getutcdate() ;
END 
ELSE IF @type = N'Виконано' 
BEGIN
INSERT INTO #ClaimsResult
SELECT
	[Lokal_copy_gorodok_claims].claim_number AS [Номер питання],
	[QuestionStates].[name] AS [Стан питання],
	[Lokal_copy_gorodok_claims].claims_type AS [Тип питання],
	[Lokal_copy_gorodok_claims].executor AS [Виконавець],
	[Lokal_copy_gorodok_claims].plan_finish_date AS [Планова дата виконання],
	[Lokal_copy_gorodok_claims].Id
FROM
	[CRM_1551_GORODOK_Integrartion].[dbo].[Gorodok_1551_houses] [Gorodok_1551_houses]
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[Lokal_copy_gorodok_claims] [Lokal_copy_gorodok_claims] ON [Lokal_copy_gorodok_claims].[object_id] = [Gorodok_1551_houses].gorodok_houses_id
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].Claims_states Claims_states ON Claims_states.[name] = [Lokal_copy_gorodok_claims].[status]
	LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON [QuestionStates].Id = Claims_states.[1551_state]
WHERE
	[Gorodok_1551_houses].[1551_houses_id] IN (
		SELECT
			[LiveAddress].building_id
		FROM
			[dbo].[LiveAddress]
		WHERE
			building_id IS NOT NULL
			AND [LiveAddress].applicant_id = @applicant_id
	)
	AND Claims_states.[1551_state] IN (
		SELECT
			[QuestionStates].Id
		FROM
			[QuestionStates]
		WHERE
			[QuestionStates].[name] IN (N'Закрито')
	) ;
END 
END
---> Для отбора заявок из городка при выборе объекта (дом заявителя)
ELSE IF(@object_id IS NOT NULL)
BEGIN
DECLARE @building_id INT = (SELECT builbing_id FROM [dbo].[Objects] WHERE Id = @object_id); 
IF @type = N'Усі' 
BEGIN
INSERT INTO #ClaimsResult
SELECT
	[Lokal_copy_gorodok_claims].claim_number AS [Номер питання],
	[QuestionStates].[name] AS [Стан питання],
	[Lokal_copy_gorodok_claims].claims_type AS [Тип питання],
	[Lokal_copy_gorodok_claims].executor AS [Виконавець],
	[Lokal_copy_gorodok_claims].plan_finish_date AS [Планова дата виконання],
	[Lokal_copy_gorodok_claims].Id
FROM
	[CRM_1551_GORODOK_Integrartion].[dbo].[Gorodok_1551_houses] [Gorodok_1551_houses]
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[Lokal_copy_gorodok_claims] [Lokal_copy_gorodok_claims] ON [Lokal_copy_gorodok_claims].[object_id] = [Gorodok_1551_houses].gorodok_houses_id
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].Claims_states Claims_states ON Claims_states.[name] = [Lokal_copy_gorodok_claims].[status]
	LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON [QuestionStates].Id = Claims_states.[1551_state]
WHERE
	[Gorodok_1551_houses].[1551_houses_id] IN (
		SELECT
			[LiveAddress].building_id
		FROM
			[dbo].[LiveAddress]
		WHERE
			building_id = @building_id 
	);
END 
ELSE IF @type = N'Зареєстровано' 
BEGIN
INSERT INTO #ClaimsResult
SELECT
	[Lokal_copy_gorodok_claims].claim_number AS [Номер питання],
	[QuestionStates].[name] AS [Стан питання],
	[Lokal_copy_gorodok_claims].claims_type AS [Тип питання],
	[Lokal_copy_gorodok_claims].executor AS [Виконавець],
	[Lokal_copy_gorodok_claims].plan_finish_date AS [Планова дата виконання],
	[Lokal_copy_gorodok_claims].Id
FROM
	[CRM_1551_GORODOK_Integrartion].[dbo].[Gorodok_1551_houses] [Gorodok_1551_houses]
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[Lokal_copy_gorodok_claims] [Lokal_copy_gorodok_claims] ON [Lokal_copy_gorodok_claims].[object_id] = [Gorodok_1551_houses].gorodok_houses_id
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].Claims_states Claims_states ON Claims_states.[name] = [Lokal_copy_gorodok_claims].[status]
	LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON [QuestionStates].Id = Claims_states.[1551_state]
WHERE
	[Gorodok_1551_houses].[1551_houses_id] IN (
		SELECT
			[LiveAddress].building_id
		FROM
			[dbo].[LiveAddress]
		WHERE
			building_id = @building_id 
	)
	AND Claims_states.[1551_state] IN (
		SELECT
			[QuestionStates].Id
		FROM
			[QuestionStates]
		WHERE
			[QuestionStates].[name] = (N'Зареєстровано')
	) ;
END 
ELSE IF @type = N'В роботі' 
BEGIN
INSERT INTO #ClaimsResult
SELECT
	[Lokal_copy_gorodok_claims].claim_number AS [Номер питання],
	[QuestionStates].[name] AS [Стан питання],
	[Lokal_copy_gorodok_claims].claims_type AS [Тип питання],
	[Lokal_copy_gorodok_claims].executor AS [Виконавець],
	[Lokal_copy_gorodok_claims].plan_finish_date AS [Планова дата виконання],
	[Lokal_copy_gorodok_claims].Id
FROM
	[CRM_1551_GORODOK_Integrartion].[dbo].[Gorodok_1551_houses] [Gorodok_1551_houses]
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[Lokal_copy_gorodok_claims] [Lokal_copy_gorodok_claims] ON [Lokal_copy_gorodok_claims].[object_id] = [Gorodok_1551_houses].gorodok_houses_id
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].Claims_states Claims_states ON Claims_states.[name] = [Lokal_copy_gorodok_claims].[status]
	LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON [QuestionStates].Id = Claims_states.[1551_state]
WHERE
	[Gorodok_1551_houses].[1551_houses_id] IN (
		SELECT
			[LiveAddress].building_id
		FROM
			[dbo].[LiveAddress]
		WHERE
			building_id = @building_id 
	)
	AND Claims_states.[1551_state] IN (
		SELECT
			[QuestionStates].Id
		FROM
			[QuestionStates]
		WHERE
			[QuestionStates].[name] IN (N'В роботі', N'На перевірці')
	) ;
END 
ELSE IF @type = N'Просрочено' 
BEGIN
INSERT INTO #ClaimsResult
SELECT
	[Lokal_copy_gorodok_claims].claim_number AS [Номер питання],
	[QuestionStates].[name] AS [Стан питання],
	[Lokal_copy_gorodok_claims].claims_type AS [Тип питання],
	[Lokal_copy_gorodok_claims].executor AS [Виконавець],
	[Lokal_copy_gorodok_claims].plan_finish_date AS [Планова дата виконання],
	[Lokal_copy_gorodok_claims].Id
FROM
	[CRM_1551_GORODOK_Integrartion].[dbo].[Gorodok_1551_houses] [Gorodok_1551_houses]
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[Lokal_copy_gorodok_claims] [Lokal_copy_gorodok_claims] ON [Lokal_copy_gorodok_claims].[object_id] = [Gorodok_1551_houses].gorodok_houses_id
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].Claims_states Claims_states ON Claims_states.[name] = [Lokal_copy_gorodok_claims].[status]
	LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON [QuestionStates].Id = Claims_states.[1551_state]
WHERE
	[Gorodok_1551_houses].[1551_houses_id] IN (
		SELECT
			[LiveAddress].building_id
		FROM
			[dbo].[LiveAddress]
		WHERE
			building_id = @building_id 
	)
	AND Claims_states.[1551_state] IN (
		SELECT
			[QuestionStates].Id
		FROM
			[QuestionStates]
		WHERE
			[QuestionStates].[name] NOT IN (N'Закрито')
	)
	AND [Lokal_copy_gorodok_claims].[plan_finish_date] <= getutcdate() ;
END 
ELSE IF @type = N'Виконано' 
BEGIN
INSERT INTO #ClaimsResult
SELECT
	[Lokal_copy_gorodok_claims].claim_number AS [Номер питання],
	[QuestionStates].[name] AS [Стан питання],
	[Lokal_copy_gorodok_claims].claims_type AS [Тип питання],
	[Lokal_copy_gorodok_claims].executor AS [Виконавець],
	[Lokal_copy_gorodok_claims].plan_finish_date AS [Планова дата виконання],
	[Lokal_copy_gorodok_claims].Id
FROM
	[CRM_1551_GORODOK_Integrartion].[dbo].[Gorodok_1551_houses] [Gorodok_1551_houses]
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[Lokal_copy_gorodok_claims] [Lokal_copy_gorodok_claims] ON [Lokal_copy_gorodok_claims].[object_id] = [Gorodok_1551_houses].gorodok_houses_id
	LEFT JOIN [CRM_1551_GORODOK_Integrartion].[dbo].Claims_states Claims_states ON Claims_states.[name] = [Lokal_copy_gorodok_claims].[status]
	LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON [QuestionStates].Id = Claims_states.[1551_state]
WHERE
	[Gorodok_1551_houses].[1551_houses_id] IN (
		SELECT
			[LiveAddress].building_id
		FROM
			[dbo].[LiveAddress]
		WHERE
			building_id = @building_id 
	)
	AND Claims_states.[1551_state] IN (
		SELECT
			[QuestionStates].Id
		FROM
			[QuestionStates]
		WHERE
			[QuestionStates].[name] = (N'Закрито')
	) ;
END 
END
	SELECT 
		[Номер питання],
		[Стан питання],
		[Тип питання],
		[Виконавець],
		[Планова дата виконання],
		[Id]
	FROM #ClaimsResult
	WHERE 
	#filter_columns#
	#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY
;