  /*
  DECLARE @userId NVARCHAR(128) = N'646d6b5e-9f27-4764-9612-f18d04fea509';
  DECLARE @orgId INT = NULL;
  DECLARE @startDate DATE = N'2020-06-01';
  DECLARE @endDate DATE = NULL;
  DECLARE @Control_startDate DATE = N'2020-06-01';
  DECLARE @Control_endDate DATE = N'2020-10-10';
  DECLARE @code NVARCHAR(50) = NULL;
  DECLARE @entity NVARCHAR(50) = 'assignment';
  DECLARE @entityNumber NVARCHAR(50) = NULL;
  DECLARE @objecId INT = 20844;
 */
 
SET @startDate = IIF(@startDate IS NULL, '1900-01-01', @startDate);   
SET @endDate = IIF(@endDate IS NULL, '2100-01-01', @endDate);  
SET @Control_startDate = IIF(@Control_startDate IS NULL, '1900-01-01', @Control_startDate);
SET @Control_endDate = IIF(@Control_endDate IS NULL, '2100-01-01', @Control_endDate);
SET @code = IIF(@code IS NULL, 
				N'new_assignemnt, 
				in_work_assignment, 
				in_work_event, 
				overdue_assignment, 
				overdue_event, 
				attention_assignment,
				attention_event,
				curatorreturn_assignment,
				applicantreturn_assignment',
				@code);

DECLARE @user_position TABLE (Id INT);
INSERT INTO @user_position
SELECT 
	[Id]
FROM dbo.Positions 
WHERE [programuser_id] = @userId;

DECLARE @user_orgs TABLE (Id INT, code INT);
DECLARE @now DATETIME = GETUTCDATE();

DECLARE @InUserResponseRights TABLE (Id INT);
INSERT INTO @InUserResponseRights
SELECT 
DISTINCT 
	[organization_id]
FROM [dbo].[OrganizationInResponsibilityRights]
WHERE [position_id] IN (SELECT [Id] FROM @user_position);

IF (@orgId IS NULL)
BEGIN
	INSERT INTO @user_orgs
	SELECT 
		org.[Id],
		org.[organization_code]
	FROM @InUserResponseRights org_resp
	INNER JOIN dbo.[Organizations] org ON org.Id = org_resp.Id;
END
ELSE
BEGIN
	IF(@orgId NOT IN (SELECT [Id] FROM @InUserResponseRights))
	BEGIN
		RAISERROR(N'Користувач не має доступу до даної організації', 16, 1);
		RETURN;
	END
	INSERT INTO @user_orgs
	SELECT 
		@orgId,
		[organization_code] 
	FROM dbo.[Organizations] 
	WHERE Id = @orgId;
END

DECLARE @resultTab TABLE 
	([Id] INT, --all
	[registration_number] NVARCHAR(50), --all
	[event_class_name] NVARCHAR(300), --event
	[assignment_state] NVARCHAR(100), --assignment
	[event_active] BIT, --event
	[code] NVARCHAR(50), --all
	[assignment_executor_organization_name] NVARCHAR(300), --assignment
	[assignment_executor_person_name] NVARCHAR(300), --assignment
	[event_organization_name] NVARCHAR(300), --event
	[question_type_name] NVARCHAR(300), --assignment
	[question_object] NVARCHAR(300), --all
	[event_object] NVARCHAR(MAX), --event
	[assignment_execution_date] DATETIME, --assignment
	[assignment_registration_date] DATETIME, --assignment
	[event_start_date] DATETIME, --event
	[event_plan_end_date] DATETIME, --event 
	[object_id] INT) 
	;


-- Надійшло
IF (CHARINDEX(N'new_assignemnt', @code) > 0)
AND (@entity = N'assignment' OR @entity IS NULL)
BEGIN
	INSERT INTO @resultTab
	SELECT 
		ass.[Id],
		q.[registration_number],
		NULL AS [event_class_name],
		ass_st.[name] AS [assignment_state],
		NULL AS [event_active],
		N'new_assignemnt' AS [code],
		org.[name] AS [assignment_executor_organization_name],
		p_exec.[name] AS [assignment_executor_person_name],
		NULL AS [event_organization_name],
		qt.[name] AS [question_type_name],
		obj.[name] AS [question_object],
		NULL AS [event_object],
		ass.[execution_date] AS [assignment_execution_date],
		ass.[registration_date] AS [assignment_registration_date],
		NULL AS [event_start_date],
		NULL AS [event_plan_end_date],
		obj.[Id] AS [object_id]
	FROM dbo.[Organizations] org
	INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
		AND ass.[assignment_state_id] = 1 
		AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
		AND ass.[registration_date] BETWEEN @startDate AND @endDate
		AND ass.[execution_date] BETWEEN @Control_startDate AND @Control_endDate
	LEFT JOIN dbo.[Positions] p_exec ON p_exec.[Id] = ass.[executor_person_id] 
	LEFT JOIN dbo.[AssignmentStates] ass_st ON ass_st.[Id] = ass.[assignment_state_id]
	LEFT JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
	LEFT JOIN dbo.[Objects] obj ON obj.[id] = q.[object_id]
	LEFT JOIN dbo.[QuestionTypes] qt ON q.[question_type_id] = qt.[Id];
END
-- В роботі Доручень 
IF (CHARINDEX(N'in_work_assignment', @code) > 0)
AND (@entity = N'assignment' OR @entity IS NULL)
BEGIN
	INSERT INTO @resultTab
	SELECT 
		ass.[Id],
		q.[registration_number],
		NULL AS [event_class_name],
		ass_st.[name] AS [assignment_state],
		NULL AS [event_active],
		N'in_work_assignment' AS [code],
		org.[name] AS [assignment_executor_organization_name],
		p_exec.[name] AS [assignment_executor_person_name],
		NULL AS [event_organization_name],
		qt.[name] AS [question_type_name],
		obj.[name] AS [question_object],
		NULL AS [event_object],
		ass.[execution_date] AS [assignment_execution_date],
		ass.[registration_date] AS [assignment_registration_date],
		NULL AS [event_start_date],
		NULL AS [event_plan_end_date],
		obj.[Id] AS [object_id]
	FROM dbo.[Organizations] org
	INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
		AND ass.[assignment_state_id] = 2 
		AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
		AND ass.[registration_date] BETWEEN @startDate AND @endDate
		AND ass.[execution_date] BETWEEN @Control_startDate AND @Control_endDate
	LEFT JOIN dbo.[Positions] p_exec ON p_exec.[Id] = ass.[executor_person_id] 
	LEFT JOIN dbo.[AssignmentStates] ass_st ON ass_st.[Id] = ass.[assignment_state_id]
	LEFT JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
	LEFT JOIN dbo.[Objects] obj ON obj.[id] = q.[object_id]
	LEFT JOIN dbo.[QuestionTypes] qt ON q.[question_type_id] = qt.[Id];
END
-- В роботі Заходів  
IF (CHARINDEX(N'in_work_event', @code) > 0)
AND (@entity = N'event' OR @entity IS NULL)
BEGIN
INSERT INTO @resultTab
SELECT
DISTINCT
	e.[Id],
	e.[Id] AS [registration_number],
	ec.[name] AS [event_class_name],
	NULL AS [assignment_state],
	e.[active] AS [event_active],
	N'in_work_event' AS [code],
	NULL AS [assignment_executor_organization_name],
	NULL AS [assignment_executor_person_name],
	org.[name] AS [event_organization_name],
	NULL AS [question_type_name],
	qobj.[name] AS [question_object],
	[event_object] = STUFF(
       (SELECT ', ' + o.[name]
        FROM dbo.[Events] e1
        INNER JOIN dbo.[EventObjects] eo ON e1.Id = eo.[event_id]
		INNER JOIN dbo.[Objects] o ON o.[Id] = eo.[object_id]
        WHERE eo.[event_id] = e.[Id]
        FOR XML PATH('')), 1, 1, ''),
	NULL AS [assignment_execution_date],
	NULL AS [assignment_registration_date],
	e.[start_date] AS [event_start_date],
	e.[plan_end_date] AS [event_plan_end_date],
	qobj.[Id] AS [object_id]
FROM dbo.[Organizations] org
INNER JOIN dbo.[EventOrganizers] eo ON eo.[organization_id] = org.[Id]
	AND eo.[organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Events] e ON e.[Id] = eo.[event_id]
	AND e.[active] = 1 
	AND e.[start_date] BETWEEN @startDate AND @endDate 
	AND e.[plan_end_date] BETWEEN @Control_startDate AND @Control_endDate
	AND e.[plan_end_date] > @now
LEFT JOIN dbo.[Event_Class] ec ON ec.[Id] = e.[event_class_id]
LEFT JOIN dbo.[Questions] q ON q.[event_id] = e.[Id] 
LEFT JOIN dbo.[Objects] qobj ON qobj.[Id] = q.[object_id];
END
-- Прострочено Доручень 
IF (CHARINDEX(N'overdue_assignment', @code) > 0)
AND (@entity = N'assignment' OR @entity IS NULL)
BEGIN
INSERT INTO @resultTab
SELECT 
	ass.[Id],
	q.[registration_number],
	NULL AS [event_class_name],
	ass_st.[name] AS [assignment_state],
	NULL AS [event_active],
	N'overdue_assignment' AS [code],
	org.[name] AS [assignment_executor_organization_name],
	p_exec.[name] AS [assignment_executor_person_name],
	NULL AS [event_organization_name],
	qt.[name] AS [question_type_name],
	obj.[name] AS [question_object],
	NULL AS [event_object],
	ass.[execution_date] AS [assignment_execution_date],
	ass.[registration_date] AS [assignment_registration_date],
	NULL AS [event_start_date],
	NULL AS [event_plan_end_date],
	obj.[Id] AS [object_id]
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] IN (1,2) 
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
	AND ass.[registration_date] BETWEEN @startDate AND @endDate
	AND ass.[execution_date] BETWEEN @Control_startDate AND @Control_endDate
	AND ass.[execution_date] < @now 
INNER JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
LEFT JOIN dbo.[Positions] p_exec ON p_exec.[Id] = ass.[executor_person_id] 
LEFT JOIN dbo.[AssignmentStates] ass_st ON ass_st.[Id] = ass.[assignment_state_id]
LEFT JOIN dbo.[Objects] obj ON obj.[id] = q.[object_id]
LEFT JOIN dbo.[QuestionTypes] qt ON q.[question_type_id] = qt.[Id];
END
-- Прострочено Заходів
IF (CHARINDEX(N'overdue_event', @code) > 0)
AND (@entity = N'event' OR @entity IS NULL)
BEGIN   
INSERT INTO @resultTab
SELECT 
DISTINCT
	e.[Id],
	e.[Id] AS [registration_number],
	ec.[name] AS [event_class_name],
	NULL AS [assignment_state],
	e.[active] AS [event_active],
	N'overdue_event' AS [code],
	NULL AS [assignment_executor_organization_name],
	NULL AS [assignment_executor_person_name],
	org.[name] AS [event_organization_name],
	NULL AS [question_type_name],
	qobj.[name] AS [question_object],
	[event_object] = STUFF(
       (SELECT ', ' + o.[name]
        FROM dbo.[Events] e1
        INNER JOIN dbo.[EventObjects] eo ON e1.Id = eo.[event_id]
		INNER JOIN dbo.[Objects] o ON o.[Id] = eo.[object_id]
        WHERE eo.[event_id] = e.[Id]
        FOR XML PATH('')), 1, 1, ''),
	NULL AS [assignment_execution_date],
	NULL AS [assignment_registration_date],
	e.[start_date] AS [event_start_date],
	e.[plan_end_date] AS [event_plan_end_date],
	qobj.[Id] AS [object_id]
FROM dbo.[Organizations] org
INNER JOIN dbo.[EventOrganizers] eo ON eo.[organization_id] = org.[Id]
	AND eo.[organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Events] e ON e.[Id] = eo.[event_id]
	AND e.[active] = 1 
	AND e.[start_date] BETWEEN @startDate AND @endDate
	AND e.[plan_end_date] BETWEEN @Control_startDate AND @Control_endDate
	AND e.[plan_end_date] < @now 
LEFT JOIN dbo.[Event_Class] ec ON ec.[Id] = e.[event_class_id]
LEFT JOIN dbo.[Questions] q ON q.[event_id] = e.[Id] 
LEFT JOIN dbo.[Objects] qobj ON qobj.[Id] = q.[object_id];
END
-- Увага Доручень 
IF (CHARINDEX(N'attention_assignment', @code) > 0)
AND (@entity = N'assignment' OR @entity IS NULL)
BEGIN   
INSERT INTO @resultTab
SELECT 
	ass.[Id],
	q.[registration_number],
	NULL AS [event_class_name],
	ass_st.[name] AS [assignment_state],
	NULL AS [event_active],
	N'attention_assignment' AS [code],
	org.[name] AS [assignment_executor_organization_name],
	p_exec.[name] AS [assignment_executor_person_name],
	NULL AS [event_organization_name],
	qt.[name] AS [question_type_name],
	obj.[name] AS [question_object],
	NULL AS [event_object],
	ass.[execution_date] AS [assignment_execution_date],
	ass.[registration_date] AS [assignment_registration_date],
	NULL AS [event_start_date],
	NULL AS [event_plan_end_date],
	obj.[Id] AS [object_id]
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] IN (1,2) 
	AND ass.[registration_date] BETWEEN @startDate AND @endDate
	AND ass.[execution_date] BETWEEN @Control_startDate AND @Control_endDate
	--> до дати контролю залишився 1 день
	AND (CAST(DATEADD(DAY, 1, ass.[execution_date]) AS DATE) = CAST(ass.[execution_date] AS DATE) 
	--> залишилося 1/5 часу від дати реєстрації до дати контролю
	OR DATEDIFF(HOUR, ass.[execution_date], ass.[execution_date]) / 5 
	<=  DATEDIFF(HOUR, @now, ass.[execution_date]) )
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
LEFT JOIN dbo.[Positions] p_exec ON p_exec.[Id] = ass.[executor_person_id] 
LEFT JOIN dbo.[AssignmentStates] ass_st ON ass_st.[Id] = ass.[assignment_state_id]
LEFT JOIN dbo.[Objects] obj ON obj.[id] = q.[object_id]
LEFT JOIN dbo.[QuestionTypes] qt ON q.[question_type_id] = qt.[Id];
END

-- Увага Заходів  
IF (CHARINDEX(N'attention_event', @code) > 0)
AND (@entity = N'event' OR @entity IS NULL)
BEGIN   
INSERT INTO @resultTab
SELECT 
DISTINCT
	e.[Id],
	e.[Id] AS [registration_number],
	ec.[name] AS [event_class_name],
	NULL AS [assignment_state],
	e.[active] AS [event_active],
	N'attention_event' AS [code],
	NULL AS [assignment_executor_organization_name],
	NULL AS [assignment_executor_person_name],
	org.[name] AS [event_organization_name],
	NULL AS [question_type_name],
	qobj.[name] AS [question_object],
	[event_object] = STUFF(
       (SELECT ', ' + o.[name]
        FROM dbo.[Events] e1
        INNER JOIN dbo.[EventObjects] eo ON e1.Id = eo.[event_id]
		INNER JOIN dbo.[Objects] o ON o.[Id] = eo.[object_id]
        WHERE eo.[event_id] = e.[Id]
        FOR XML PATH('')), 1, 1, ''),
	NULL AS [assignment_execution_date],
	NULL AS [assignment_registration_date],
	e.[start_date] AS [event_start_date],
	e.[plan_end_date] AS [event_plan_end_date],
	qobj.[Id] AS [object_id]
FROM dbo.[Organizations] org
INNER JOIN dbo.[EventOrganizers] eo ON eo.[organization_id] = org.[Id]
	AND eo.[organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Events] e ON e.[Id] = eo.[event_id]
	AND e.[active] = 1 
	AND e.[start_date] BETWEEN @startDate AND @endDate
	AND e.[plan_end_date] BETWEEN @Control_startDate AND @Control_endDate
	--> до планового завершення залишився 1 день
	AND (CAST(DATEADD(DAY, 1, e.[plan_end_date]) AS DATE) = CAST(e.[plan_end_date] AS DATE) 
	--> залишилося 1/5 часу від дати реєстрації до планового завершення
	OR DATEDIFF(HOUR, e.[plan_end_date], e.[plan_end_date]) / 5 
	<=  DATEDIFF(HOUR, @now, e.[plan_end_date]) )
LEFT JOIN dbo.[Event_Class] ec ON ec.[Id] = e.[event_class_id]
LEFT JOIN dbo.[Questions] q ON q.[event_id] = e.[Id] 
LEFT JOIN dbo.[Objects] qobj ON qobj.[Id] = q.[object_id];
END
-- Повернені куратором 
IF (CHARINDEX(N'curatorreturn_assignment', @code) > 0)
AND (@entity = N'assignment' OR @entity IS NULL)
BEGIN   
INSERT INTO @resultTab
SELECT 
	ass.[Id],
	q.[registration_number],
	NULL AS [event_class_name],
	ass_st.[name] AS [assignment_state],
	NULL AS [event_active],
	N'curatorreturn_assignment' AS [code],
	org.[name] AS [assignment_executor_organization_name],
	p_exec.[name] AS [assignment_executor_person_name],
	NULL AS [event_organization_name],
	qt.[name] AS [question_type_name],
	obj.[name] AS [question_object],
	NULL AS [event_object],
	ass.[execution_date] AS [assignment_execution_date],
	ass.[registration_date] AS [assignment_registration_date],
	NULL AS [event_start_date],
	NULL AS [event_plan_end_date],
	obj.[Id] AS [object_id]
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] = 4
	AND ass.[AssignmentResultsId] = 5
	AND ass.[AssignmentResolutionsId] = 7
	AND ass.[registration_date] BETWEEN @startDate AND @endDate
	AND ass.[execution_date] BETWEEN @Control_startDate AND @Control_endDate
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
LEFT JOIN dbo.[Positions] p_exec ON p_exec.[Id] = ass.[executor_person_id] 
LEFT JOIN dbo.[AssignmentStates] ass_st ON ass_st.[Id] = ass.[assignment_state_id]
LEFT JOIN dbo.[Objects] obj ON obj.[id] = q.[object_id]
LEFT JOIN dbo.[QuestionTypes] qt ON q.[question_type_id] = qt.[Id];
END
-- Повернені заявником 
IF (CHARINDEX(N'applicantreturn_assignment', @code) > 0)
AND (@entity = N'assignment' OR @entity IS NULL)
BEGIN  
INSERT INTO @resultTab
SELECT 
	ass.[Id],
	q.[registration_number],
	NULL AS [event_class_name],
	ass_st.[name] AS [assignment_state],
	NULL AS [event_active],
	N'applicantreturn_assignment' AS [code],
	org.[name] AS [assignment_executor_organization_name],
	p_exec.[name] AS [assignment_executor_person_name],
	NULL AS [event_organization_name],
	qt.[name] AS [question_type_name],
	obj.[name] AS [question_object],
	NULL AS [event_object],
	ass.[execution_date] AS [assignment_execution_date],
	ass.[registration_date] AS [assignment_registration_date],
	NULL AS [event_start_date],
	NULL AS [event_plan_end_date],
	obj.[Id] AS [object_id]
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] = 4
	AND ass.[AssignmentResultsId] = 5
	AND ass.[AssignmentResolutionsId] = 8
	AND ass.[registration_date] BETWEEN @startDate AND @endDate
	AND ass.[execution_date] BETWEEN @Control_startDate AND @Control_endDate
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
LEFT JOIN dbo.[Positions] p_exec ON p_exec.[Id] = ass.[executor_person_id] 
LEFT JOIN dbo.[AssignmentStates] ass_st ON ass_st.[Id] = ass.[assignment_state_id]
LEFT JOIN dbo.[Objects] obj ON obj.[id] = q.[object_id]
LEFT JOIN dbo.[QuestionTypes] qt ON q.[question_type_id] = qt.[Id];;
END

IF (@entityNumber IS NOT NULL)
BEGIN
	DELETE FROM @resultTab
	WHERE [registration_number] 
		<> @entityNumber;
END

IF (@objecId IS NOT NULL)
BEGIN
	DELETE FROM @resultTab
	WHERE [object_id] 
		<> @objecId
		OR [object_id] IS NULL;
END

SELECT  
	[Id],
	[registration_number],
	[event_class_name],
	[assignment_state], 
	[event_active],
	[code],
	[assignment_executor_organization_name],
	[assignment_executor_person_name],
	[event_organization_name],
	[question_type_name],
	[question_object],
	[event_object],
	[assignment_execution_date],
	[assignment_registration_date],
	[event_start_date],
	[event_plan_end_date]
FROM @resultTab
WHERE #filter_columns#
	  #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY
;