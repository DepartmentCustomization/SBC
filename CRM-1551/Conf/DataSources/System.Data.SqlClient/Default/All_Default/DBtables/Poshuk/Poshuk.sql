/*
DECLARE @user_id NVARCHAR(128) = N'40dd9fa3-7d58-418c-a2a0-38e9e100d3fd';
DECLARE @organization_id INT = 1;
DECLARE @appealNum NVARCHAR(400) = N'0-303939';
DECLARE @navigation NVARCHAR(400) = N'Усі';
*/

DECLARE @input_str NVARCHAR(2000) = REPLACE(@appealNum, N', ', N',') + N', ';

-- создаем таблицу в которую будем
-- записывать наши айдишники
DECLARE @table TABLE (id NVARCHAR(500)) ; -- создаем переменную, хранящую разделитель
DECLARE @delimeter NVARCHAR(2) = N',' ; -- определяем позицию первого разделителя
DECLARE @pos INT = charindex(@delimeter, @input_str) ; -- создаем переменную для хранения одного айдишника
DECLARE @id NVARCHAR(500) ;

WHILE (@pos != 0) 
BEGIN -- получаем айдишник
SET
  @id = SUBSTRING(@input_str, 1, @pos -1) ; 
  -- записываем в таблицу
INSERT INTO
  @table (id)
VALUES
(@id) ;
 -- сокращаем исходную строку на
  -- размер полученного айдишника
  -- и разделителя
SET
  @input_str = SUBSTRING(@input_str, @pos + 1, LEN(@input_str)) ;
   -- определяем позицию след. разделителя
SET
  @pos = CHARINDEX(@delimeter, @input_str) ;
END 

-- select id from @table

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
DECLARE @IsHere BIT = IIF(
   (
      SELECT
         COUNT(1)
      FROM
         dbo.Appeals
      WHERE
         registration_number IN (SELECT id FROM @table)
   ) = 0,
   0,
   1
);

IF(@IsHere = 1)
BEGIN
DECLARE @Organization TABLE(Id INT);

DECLARE @OrganizationId INT = CASE
  WHEN @organization_id IS NOT NULL THEN @organization_id
  ELSE (
    SELECT
      Id
    FROM
      [CRM_1551_Analitics].[dbo].[Organizations]
    WHERE
      Id IN (
        SELECT
          organization_id
        FROM
          [CRM_1551_Analitics].[dbo].[Workers]
        WHERE
          worker_user_id = @user_id
      )
  ) 
END ;

DECLARE @IdT TABLE (Id INT);

-- НАХОДИМ ИД ОРГАНИЗАЦИЙ ГДЕ ИД И ПАРЕНТЫ ВЫБРАНОЙ И СРАЗУ ЗАЛИВАЕМ
INSERT INTO
  @IdT(Id)
SELECT
  Id
FROM
  [CRM_1551_Analitics].[dbo].[Organizations]
WHERE
  (
    Id = @OrganizationId
    OR [parent_organization_id] = @OrganizationId
  )
  AND Id NOT IN (
    SELECT
      Id
    FROM
      @IdT
  ) ;
   --  НАХОДИМ ПАРЕНТЫ ОРГ, КОТОРЫХ ЗАЛИЛИ, <-- нужен цыкл
  WHILE (
    SELECT
      count(id)
    FROM
      (
        SELECT
          Id
        FROM
          [CRM_1551_Analitics].[dbo].[Organizations]
        WHERE
          [parent_organization_id] IN (
            SELECT
              Id
            FROM
              @IdT
          ) --or Id in (select Id from @IdT)
          AND Id NOT IN (
            SELECT
              Id
            FROM
              @IdT
          )
      ) q
  ) != 0 BEGIN
INSERT INTO
  @IdT
SELECT
  Id
FROM
  [CRM_1551_Analitics].[dbo].[Organizations]
WHERE
  [parent_organization_id] IN (
    SELECT
      Id
    FROM
      @IdT
  ) --or Id in (select Id from @IdT)
  AND Id NOT IN (
    SELECT
      Id
    FROM
      @IdT
  ) ;
END
INSERT INTO
  @Organization (Id)
SELECT
  Id
FROM
  @IdT;

WITH main AS (
  SELECT
    [Assignments].Id,
    [Organizations].Id OrganizationsId,
    [Organizations].name OrganizationsName,
    [Applicants].full_name zayavnyk,
    N'Вул.' + Streets.name + N', буд.' + [Buildings].name adress,
    [Questions].registration_number,
    [QuestionTypes].name QuestionType,
    --стало
    CASE
      WHEN [ReceiptSources].name = N'УГЛ' THEN N'УГЛ'
      WHEN [ReceiptSources].name = N'Сайт/моб. додаток' THEN N'Електронні джерела'
      WHEN [QuestionTypes].emergency = N'true' THEN N'Пріоритетне'
      WHEN [QuestionTypes].parent_organization_is = N'true' THEN N'Зауваження'
      ELSE N'Інші доручення'
    END navigation,
    --стало
    CASE
      WHEN [AssignmentTypes].code <> N'ToAttention'
      AND [AssignmentStates].code = N'Registered' THEN 1
      ELSE 0
    END nadiyshlo,
    CASE
      WHEN [AssignmentTypes].code <> N'ToAttention'
      AND [AssignmentStates].code = N'Closed'
      AND [AssignmentResults].code = N'NotInTheCompetence' THEN 1
      ELSE 0
    END neVKompetentsii,
    CASE
      WHEN [AssignmentTypes].code <> N'ToAttention'
      AND [AssignmentStates].code = N'InWork'
      AND dateadd(
        HH,
        [execution_term],
        [Assignments].registration_date
      ) < getdate() THEN 1
      ELSE 0
    END prostrocheni,
    CASE
      WHEN [AssignmentTypes].code <> N'ToAttention'
      AND [AssignmentStates].code = N'InWork'
      AND datediff(HH, [Assignments].registration_date, getdate()) > [Attention_term_hours]
      AND datediff(HH, [Assignments].registration_date, getdate()) <= [execution_term] THEN 1
      ELSE 0
    END uvaga,
    CASE
      WHEN [AssignmentTypes].code <> N'ToAttention'
      AND [AssignmentStates].code = N'InWork'
      AND datediff(HH, [Assignments].registration_date, getdate()) <= [Attention_term_hours] THEN 1
      ELSE 0
    END vroboti,
    CASE
      WHEN [AssignmentTypes].code = N'ToAttention' THEN 1
      ELSE 0
    END dovidima,
    CASE
      WHEN [AssignmentStates].code = N'NotFulfilled'
      AND [AssignmentResults].code = N'ForWork' THEN 1
      ELSE 0
    END naDoopratsiyvanni,
    CASE
      WHEN [AssignmentStates].code = N'NotFulfilled'
      AND [AssignmentResults].code = N'ItIsNotPossibleToPerformThisPeriod' THEN 1
      ELSE 0
    END neVykonNeMozhl,
    NULL NotUse,
    [Applicants].Id zayavnykId,
    [Questions].Id QuestionId,
    Appeals.registration_number Appealregistration_number,
    [Organizations].short_name vykonavets,
    [AssignmentConsiderations].short_answer,
    [Questions].question_content,
    [Applicants].[ApplicantAdress] adressZ,
    [AssignmentStates].name AssignmentStates,
    [Questions].control_date
  FROM
    [CRM_1551_Analitics].[dbo].[Assignments] [Assignments] 
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Questions] [Questions] ON [Assignments].question_id = [Questions].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Appeals] [Appeals] ON [Questions].appeal_id = [Appeals].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[ReceiptSources] [ReceiptSources] ON [Appeals].receipt_source_id = [ReceiptSources].Id 
    LEFT JOIN [CRM_1551_Analitics].[dbo].[QuestionTypes] [QuestionTypes] ON [Questions].question_type_id = [QuestionTypes].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentTypes] [AssignmentTypes] ON [Assignments].assignment_type_id = [AssignmentTypes].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentStates] [AssignmentStates] ON [Assignments].assignment_state_id = [AssignmentStates].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentConsiderations] [AssignmentConsiderations] ON [Assignments].current_assignment_consideration_id = [AssignmentConsiderations].id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentResults] [AssignmentResults] ON [Assignments].[AssignmentResultsId] = [AssignmentResults].Id -- +
    LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentResolutions] [AssignmentResolutions] ON [Assignments].[AssignmentResolutionsId] = [AssignmentResolutions].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Organizations] [Organizations] ON [Assignments].executor_organization_id = [Organizations].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Objects] [Objects] ON [Questions].[object_id] = [Objects].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Buildings] [Buildings] ON [Objects].builbing_id = [Buildings].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Streets] [Streets] ON [Buildings].street_id = [Streets].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Applicants] [Applicants] ON [Appeals].applicant_id = [Applicants].Id
  WHERE
    [Assignments].[executor_organization_id] IN (
      SELECT
        id
      FROM
        @Organization
    )
),
nav AS (
  SELECT
    1 Id,
    N'УГЛ' name
  UNION
  ALL
  SELECT
    2 Id,
    N'Сайт' name
  UNION
  ALL
  SELECT
    3 Id,
    N'Пріоритетне' name
  UNION
  ALL
  SELECT
    4 Id,
    N'Інші доручення' name
  UNION
  ALL
  SELECT
    5 Id,
    N'Зауваження' name
),
table2 AS (
  SELECT
    nav.Id,
    nav.name navigation,
    sum(nadiyshlo) nadiyshlo,
    sum(neVKompetentsii) neVKompetentsii,
    sum(prostrocheni) prostrocheni,
    sum(uvaga) uvaga,
    sum(vroboti) vroboti,
    sum(dovidima) dovidoma,
    sum(naDoopratsiyvanni) naDoopratsiyvanni,
    sum(neVykonNeMozhl) neVykonNeMozhl
  FROM
    nav
    LEFT JOIN main ON nav.name = main.navigation
  GROUP BY
    nav.Id,
    nav.name
)
SELECT
  /*ROW_NUMBER() over(order by registration_number)*/
  main.Id,
  navigation,
  registration_number,
  QuestionType,
  zayavnyk,
  adress,
  vykonavets,
  zayavnykId,
  QuestionId,
  short_answer,
  question_content,
  adressZ,
  AssignmentStates states,
  control_date
FROM
  main --where nadiyshlo=1 --navigation, registration_number, from main
WHERE
  Appealregistration_number --=@appealNum
  IN (
    SELECT
      Id
    FROM
      @table
  ) ;
END

ELSE IF(@IsHere = 0)
BEGIN
---> Check is connection to Archive db exists
DECLARE @ServerID SMALLINT = (SELECT server_id FROM sys.servers WHERE [name] = @Archive);

  IF(@ServerID IS NULL)
	BEGIN
		RETURN;
	END

	ELSE 
	BEGIN 
DECLARE @Query NVARCHAR(MAX) = 
N'DECLARE @input_str NVARCHAR(2000) = REPLACE(@appealNum, N'', '', N'','') + N'', '';
DECLARE @table TABLE (id NVARCHAR(500)) ; 
DECLARE @delimeter NVARCHAR(2) = N'','' ; -- создаем переменную, хранящую разделитель
DECLARE @pos INT = charindex(@delimeter, @input_str) ; -- определяем позицию первого разделителя
DECLARE @id NVARCHAR(500) ; -- создаем переменную для хранения одного айдишника

WHILE (@pos != 0) 
BEGIN -- получаем айдишник
SET
  @id = SUBSTRING(@input_str, 1, @pos -1) ; 
  -- записываем в таблицу
INSERT INTO
  @table (id)
VALUES
(@id) ;
 -- сокращаем исходную строку на
  -- размер полученного айдишника
  -- и разделителя
SET
  @input_str = SUBSTRING(@input_str, @pos + 1, LEN(@input_str)) ;
   -- определяем позицию след. разделителя
SET
  @pos = CHARINDEX(@delimeter, @input_str) ;
END
DECLARE @Organization TABLE(Id INT);
DECLARE @OrganizationId INT = CASE
  WHEN @organization_id IS NOT NULL THEN @organization_id
  ELSE (
    SELECT
      Id
    FROM
      [CRM_1551_Analitics].[dbo].[Organizations]
    WHERE
      Id IN (
        SELECT
          organization_id
        FROM
          [CRM_1551_Analitics].[dbo].[Workers]
        WHERE
          worker_user_id = @user_id
      )
  ) 
END ;

DECLARE @IdT TABLE (Id INT);

-- НАХОДИМ ИД ОРГАНИЗАЦИЙ ГДЕ ИД И ПАРЕНТЫ ВЫБРАНОЙ И СРАЗУ ЗАЛИВАЕМ
INSERT INTO
  @IdT(Id)
SELECT
  Id
FROM
  [CRM_1551_Analitics].[dbo].[Organizations]
WHERE
  (
    Id = @OrganizationId
    OR [parent_organization_id] = @OrganizationId
  )
  AND Id NOT IN (
    SELECT
      Id
    FROM
      @IdT
  ) ;
   --  НАХОДИМ ПАРЕНТЫ ОРГ, КОТОРЫХ ЗАЛИЛИ, <-- нужен цыкл
  WHILE (
    SELECT
      count(id)
    FROM
      (
        SELECT
          Id
        FROM
          [CRM_1551_Analitics].[dbo].[Organizations]
        WHERE
          [parent_organization_id] IN (
            SELECT
              Id
            FROM
              @IdT
          ) --or Id in (select Id from @IdT)
          AND Id NOT IN (
            SELECT
              Id
            FROM
              @IdT
          )
      ) q
  ) != 0 BEGIN
INSERT INTO
  @IdT
SELECT
  Id
FROM
  [CRM_1551_Analitics].[dbo].[Organizations]
WHERE
  [parent_organization_id] IN (
    SELECT
      Id
    FROM
      @IdT
  ) --or Id in (select Id from @IdT)
  AND Id NOT IN (
    SELECT
      Id
    FROM
      @IdT
  ) ;
END
INSERT INTO
  @Organization (Id)
SELECT
  Id
FROM
  @IdT;

WITH main AS (
  SELECT
    [Assignments].Id,
    [Organizations].Id OrganizationsId,
    [Organizations].name OrganizationsName,
    [Applicants].full_name zayavnyk,
    N''Вул.'' + Streets.name + N'', буд.'' + [Buildings].name adress,
    [Questions].registration_number,
    [QuestionTypes].name QuestionType,
    --стало
    CASE
      WHEN [ReceiptSources].name = N''УГЛ'' THEN N''УГЛ''
      WHEN [ReceiptSources].name = N''Сайт/моб. додаток'' THEN N''Електронні джерела''
      WHEN [QuestionTypes].emergency = N''true'' THEN N''Пріоритетне''
      WHEN [QuestionTypes].parent_organization_is = N''true'' THEN N''Зауваження''
      ELSE N''Інші доручення''
    END navigation,
    --стало
    CASE
      WHEN [AssignmentTypes].code <> N''ToAttention''
      AND [AssignmentStates].code = N''Registered'' THEN 1
      ELSE 0
    END nadiyshlo,
    CASE
      WHEN [AssignmentTypes].code <> N''ToAttention''
      AND [AssignmentStates].code = N''Closed''
      AND [AssignmentResults].code = N''NotInTheCompetence'' THEN 1
      ELSE 0
    END neVKompetentsii,
    CASE
      WHEN [AssignmentTypes].code <> N''ToAttention''
      AND [AssignmentStates].code = N''InWork''
      AND dateadd(
        HH,
        [execution_term],
        [Assignments].registration_date
      ) < getdate() THEN 1
      ELSE 0
    END prostrocheni,
    CASE
      WHEN [AssignmentTypes].code <> N''ToAttention''
      AND [AssignmentStates].code = N''InWork''
      AND datediff(HH, [Assignments].registration_date, getdate()) > [Attention_term_hours]
      AND datediff(HH, [Assignments].registration_date, getdate()) <= [execution_term] THEN 1
      ELSE 0
    END uvaga,
    CASE
      WHEN [AssignmentTypes].code <> N''ToAttention''
      AND [AssignmentStates].code = N''InWork''
      AND datediff(HH, [Assignments].registration_date, getdate()) <= [Attention_term_hours] THEN 1
      ELSE 0
    END vroboti,
    CASE
      WHEN [AssignmentTypes].code = N''ToAttention'' THEN 1
      ELSE 0
    END dovidima,
    CASE
      WHEN [AssignmentStates].code = N''NotFulfilled''
      AND [AssignmentResults].code = N''ForWork'' THEN 1
      ELSE 0
    END naDoopratsiyvanni,
    CASE
      WHEN [AssignmentStates].code = N''NotFulfilled''
      AND [AssignmentResults].code = N''ItIsNotPossibleToPerformThisPeriod'' THEN 1
      ELSE 0
    END neVykonNeMozhl,
    NULL NotUse,
    [Applicants].Id zayavnykId,
    [Questions].Id QuestionId,
    Appeals.registration_number Appealregistration_number,
    [Organizations].short_name vykonavets,
    [AssignmentConsiderations].short_answer,
    [Questions].question_content,
    [Applicants].[ApplicantAdress] adressZ,
    [AssignmentStates].name AssignmentStates,
    [Questions].control_date
  FROM
    [10.192.200.182].[CRM_1551_Analitics].[dbo].[Assignments] [Assignments] 
    LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[Questions] [Questions] ON [Assignments].question_id = [Questions].Id
    LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[Appeals] [Appeals] ON [Questions].appeal_id = [Appeals].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[ReceiptSources] [ReceiptSources] ON [Appeals].receipt_source_id = [ReceiptSources].Id 
    LEFT JOIN [CRM_1551_Analitics].[dbo].[QuestionTypes] [QuestionTypes] ON [Questions].question_type_id = [QuestionTypes].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentTypes] [AssignmentTypes] ON [Assignments].assignment_type_id = [AssignmentTypes].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentStates] [AssignmentStates] ON [Assignments].assignment_state_id = [AssignmentStates].Id
    LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[AssignmentConsiderations] [AssignmentConsiderations] ON [Assignments].current_assignment_consideration_id = [AssignmentConsiderations].id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentResults] [AssignmentResults] ON [Assignments].[AssignmentResultsId] = [AssignmentResults].Id -- +
    LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[AssignmentResolutions] [AssignmentResolutions] ON [Assignments].[AssignmentResolutionsId] = [AssignmentResolutions].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Organizations] [Organizations] ON [Assignments].executor_organization_id = [Organizations].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Objects] [Objects] ON [Questions].[object_id] = [Objects].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Buildings] [Buildings] ON [Objects].builbing_id = [Buildings].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Streets] [Streets] ON [Buildings].street_id = [Streets].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Applicants] [Applicants] ON [Appeals].applicant_id = [Applicants].Id
  WHERE
    [Assignments].[executor_organization_id] IN (
      SELECT
        id
      FROM
        @Organization
    )
),
nav AS (
  SELECT
    1 Id,
    N''УГЛ'' name
  UNION
  ALL
  SELECT
    2 Id,
    N''Сайт'' name
  UNION
  ALL
  SELECT
    3 Id,
    N''Пріоритетне'' name
  UNION
  ALL
  SELECT
    4 Id,
    N''Інші доручення'' name
  UNION
  ALL
  SELECT
    5 Id,
    N''Зауваження'' name
),
table2 AS (
  SELECT
    nav.Id,
    nav.name navigation,
    sum(nadiyshlo) nadiyshlo,
    sum(neVKompetentsii) neVKompetentsii,
    sum(prostrocheni) prostrocheni,
    sum(uvaga) uvaga,
    sum(vroboti) vroboti,
    sum(dovidima) dovidoma,
    sum(naDoopratsiyvanni) naDoopratsiyvanni,
    sum(neVykonNeMozhl) neVykonNeMozhl
  FROM
    nav
    LEFT JOIN main ON nav.name = main.navigation
  GROUP BY
    nav.Id,
    nav.name
)
SELECT
  /*ROW_NUMBER() over(order by registration_number)*/
  main.Id,
  navigation,
  registration_number,
  QuestionType,
  zayavnyk,
  adress,
  vykonavets,
  zayavnykId,
  QuestionId,
  short_answer,
  question_content,
  adressZ,
  AssignmentStates states,
  control_date
FROM
  main --where nadiyshlo=1 --navigation, registration_number, from main
WHERE
  Appealregistration_number --=@appealNum
  IN (
    SELECT
      Id
    FROM
      @table
  ) ; ' ;
  EXEC sp_executesql @Query, N'@appealNum NVARCHAR(400), @user_id NVARCHAR(128), @organization_id INT ', 
							@appealNum = @appealNum,
							@organization_id = @organization_id,
							@user_id = @user_id ;
END
END