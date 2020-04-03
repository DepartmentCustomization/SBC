--  DECLARE @organization_id INT = 1;
--  DECLARE @user_id NVARCHAR(300) = N'02ece542-2d75-479d-adad-fd333d09604d';
--  DECLARE @OtKuda NVARCHAR(20) = N'Усі';
--  DECLARE @TypeEvent NVARCHAR(20) = N'Не активні';

DECLARE @TypeEvent_table TABLE (name NVARCHAR(20));

DECLARE @OtKuda_table TABLE (name NVARCHAR(20));

DECLARE @ObjectInOrg TABLE ([object_id] INT);

IF @TypeEvent = N'Усі' 
BEGIN
INSERT INTO
  @TypeEvent_table([name])
SELECT
  N'В роботі'
UNION ALL
SELECT
  N'Не активні'
UNION
ALL
SELECT
  N'Прострочені';

END
ELSE BEGIN
INSERT INTO
  @TypeEvent_table(name)
SELECT
  @TypeEvent;

END IF @OtKuda = N'Усі' BEGIN
INSERT INTO
  @OtKuda_table(name)
SELECT
  N'Городок'
UNION
ALL
SELECT
  N'Система';

END
ELSE BEGIN
INSERT INTO
  @OtKuda_table (name)
SELECT
  @OtKuda;

END DECLARE @Organization TABLE(Id INT);

--select 8 id;
-- ЕСЛИ НУЖНО ВЫБИРАТЬ ЮЗЕРА
--declare @user_id nvarchar(300)=N'02ece542-2d75-479d-adad-fd333d09604d';
-- МОЖНО ПРОСТО ИД ОРГАНИЗАЦИИ ВЛЕПИТЬ
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
END;

DECLARE @IdT TABLE (Id INT);

-- НАХОДИМ ИД ОРГАНИЗАЦИЙ ГДЕ ИД И ПАРЕНТЫ ВЫБРАНОЙ И СРАЗУ ЗАЛИВАЕМ
INSERT INTO
  @IdT (Id)
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
  );

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
        )
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
  )
  AND Id NOT IN (
    SELECT
      Id
    FROM
      @IdT
  );

END
INSERT INTO
  @Organization (Id)
SELECT
  Id
FROM
  @IdT;

-- select * from @Organization
-- for global Gorodok
INSERT INTO
  @ObjectInOrg (object_id)
SELECT
  -- isnull(eo.object_id, eo.building_id) AS obj_id
  eo.object_id AS obj_id
FROM
  @Organization org
  JOIN dbo.ExecutorInRoleForObject AS eo ON eo.executor_id = org.Id
WHERE
  eo.object_id IS NOT NULL -- WHERE isnull(eo.object_id, eo.building_id) IS NOT NULL
  -- select * from @ObjectInOrg
;

WITH [Events_1] AS (
  SELECT
    [Events].Id,
    [Events].active,
    [Events].[plan_end_date],
    isnull([Events].gorodok_id, 0) AS gorodok_id,
    [Events].event_type_id,
    [Events].start_date,
    [Event_Class].name AS EventName,
	[Objects].name AS objectName
  FROM
    [CRM_1551_Analitics].[dbo].[Events] [Events]
    INNER JOIN [CRM_1551_Analitics].[dbo].[EventOrganizers] EventOrganizers ON [Events].Id = [EventOrganizers].event_id
	INNER JOIN [CRM_1551_Analitics].[dbo].[EventObjects] [EventObjects] ON [Events].Id = [EventObjects].event_id
	AND [EventObjects].in_form = 1
    LEFT JOIN dbo.[Event_Class] [Event_Class] ON [Events].event_class_id = [Event_Class].id
	LEFT JOIN [CRM_1551_Analitics].[dbo].[Objects] [Objects] ON [EventObjects].object_id = [Objects].Id
  WHERE
    [EventOrganizers].organization_id IN (
      SELECT
        id
      FROM
        @Organization
    )
  UNION
  SELECT
    [Events].Id,
    [Events].active,
    [Events].[plan_end_date],
    [Events].gorodok_id,
    [Events].event_type_id,
    [Events].start_date,
    [Event_Class].name EventName,
	[Objects].name AS objectName
  FROM
    [CRM_1551_Analitics].[dbo].[Events] [Events]
    INNER JOIN [CRM_1551_Analitics].[dbo].[EventObjects] [EventObjects] ON [Events].Id = [EventObjects].event_id
	AND [EventObjects].in_form = 1
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Objects] [Objects] ON [EventObjects].object_id = [Objects].Id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[Buildings] [Buildings] ON [Buildings].Id = [Objects].builbing_id
    LEFT JOIN [CRM_1551_Analitics].[dbo].[ExecutorInRoleForObject] [ExecutorInRoleForObject] ON [ExecutorInRoleForObject].object_id = [Buildings].Id
    LEFT JOIN [Event_Class] [Event_Class] ON [Events].event_class_id = [Event_Class].id
  WHERE
    [ExecutorInRoleForObject].[executor_role_id] IN (1, 68)
    /*балансоутримувач, генпідрядник*/
    AND [ExecutorInRoleForObject].executor_id IN (
      SELECT
        id
      FROM
        @Organization
    )
),
[Events_gorodok] AS (
  SELECT
    gl.[claim_number] AS Id,
CASE
      WHEN gl.fact_finish_date IS NULL THEN 1
      ELSE 0
    END AS active,
    gl.[plan_finish_date] AS plan_end_date,
    1 AS [gorodok_id],
    NULL AS event_type_id,
    gl.[registration_date] AS [start_date],
    gl.claims_type AS EventName,
	o.[name] AS objectName
  FROM
    [CRM_1551_GORODOK_Integrartion].[dbo].[Lokal_copy_gorodok_global] AS gl
    INNER JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[AllObjectInClaim] AS oc ON oc.claims_number_id = gl.claim_number
    INNER JOIN [CRM_1551_GORODOK_Integrartion].[dbo].[Gorodok_1551_houses] gh ON gh.gorodok_houses_id = oc.[object_id]
	LEFT JOIN [dbo].[Objects] o ON o.Id = gh.[1551_houses_id]

  WHERE
    gh.[1551_houses_id] IN (
      SELECT
        [object_id]
      FROM
        @ObjectInOrg
    )
),
main AS (
  SELECT
    [Events_1].Id event_Id,
    [Events_1].event_type_id,
    [EventTypes].name EventType,
    Questions.qty AS CountQuestions,
    [Events_1].start_date,
    [Events_1].plan_end_date,
    [Events_1].EventName,
	[Events_1].objectName,
    CASE
      WHEN [Events_1].active = 1
      AND [Events_1].[plan_end_date] > getutcdate() THEN N'В роботі'
      WHEN [Events_1].active = 1
      AND [Events_1].[plan_end_date] <= getutcdate() THEN N'Прострочені'
      WHEN [Events_1].active = 0 THEN N'Не активні'
    END TypeEvent,
    CASE
      WHEN [Events_1].gorodok_id = 1 THEN N'Городок'
      ELSE N'Система'
    END OtKuda,
    isnull(gorodok_id, 0) AS gorodok_id
  FROM
    [Events_1] [Events_1]
    LEFT JOIN EventQuestionsTypes EventQuestionsTypes ON EventQuestionsTypes.event_id = [Events_1].Id
    LEFT JOIN [EventObjects] [EventObjects] ON [EventObjects].event_id = [Events_1].Id
    LEFT JOIN [EventTypes] [EventTypes] ON [Events_1].event_type_id = [EventTypes].Id
	LEFT JOIN (SELECT 
					count(q.Id) qty,
					e.Id AS eventId
				FROM dbo.Questions q
				INNER JOIN dbo.[Events] e ON e.Id = q.event_id
				GROUP BY e.Id) Questions ON Questions.eventId = [Events_1].Id

  UNION ALL

  SELECT
    [Events_gorodok].Id event_Id,
    [Events_gorodok].event_type_id,
    '...' AS EventType,
    NULL AS CountQuestions,
    [Events_gorodok].start_date,
    [Events_gorodok].plan_end_date,
    [Events_gorodok].EventName,
	[Events_gorodok].objectName,
    CASE
      WHEN [Events_gorodok].active = 1
      AND [Events_gorodok].[plan_end_date] > getutcdate() THEN N'В роботі'
      WHEN [Events_gorodok].active = 1
      AND [Events_gorodok].[plan_end_date] <= getutcdate() THEN N'Прострочені'
      WHEN [Events_gorodok].active = 0 THEN N'Не активні'
    END TypeEvent,
    CASE
      WHEN [Events_gorodok].gorodok_id = 1 THEN N'Городок'
      ELSE N'Система'
    END OtKuda,
    gorodok_id
  FROM
    [Events_gorodok]
)
SELECT
  event_Id EventId,
  OtKuda AS base,
  gorodok_id,
  EventType,
  EventName,
  objectName,
  start_date,
  plan_end_date,
  ISNULL(CountQuestions,0) AS CountQuestions
FROM
  main
WHERE
  main.TypeEvent IN (
    SELECT
      name
    FROM
      @TypeEvent_table
  )
  AND main.OtKuda IN (
    SELECT
      name
    FROM
      @OtKuda_table
  )
GROUP BY
  event_Id,
  EventType,
  EventName,
  start_date,
  plan_end_date,
  OtKuda,
  gorodok_id,
  objectName,
  CountQuestions
  ;