--    DECLARE @userId NVARCHAR(128) = N'eb6d56d2-e217-45e4-800b-c851666ce795';
--    DECLARE @orgId INT = 2007;
--    DECLARE @startDate DATE = NULL;
--    DECLARE @code NVARCHAR(50) = N'new_assignemnt';
 
SET @startDate = IIF(@startDate IS NULL, '1900-01-01', @startDate);    
DECLARE @user_position TABLE (Id INT);
INSERT INTO @user_position
SELECT 
	[Id]
FROM dbo.Positions 
WHERE [programuser_id] = @userId;

DECLARE @user_orgs TABLE (Id INT, code INT);
DECLARE @now DATETIME = GETUTCDATE();

IF (@orgId IS NULL)
BEGIN
	INSERT INTO @user_orgs
	SELECT 
		org.[Id],
		org.[organization_code]
	FROM dbo.[OrganizationInResponsibility] org_resp 
	INNER JOIN dbo.[Organizations] org ON org.Id = org_resp.organization_id
	WHERE org_resp.position_id IN (SELECT [Id] FROM @user_position);
END
ELSE
BEGIN
	INSERT INTO @user_orgs
	SELECT 
		@orgId,
		[organization_code] 
	FROM dbo.[Organizations] 
	WHERE Id = @orgId;
END

DECLARE @resultAssignment TABLE 
	([Id] INT, 
	[registration_number] NVARCHAR(50),
	[assignment_state] NVARCHAR(100),
	[code] NVARCHAR(50),
	[executor_organization_name] NVARCHAR(300),
	[executor_person_name] NVARCHAR(300),
	[question_type_name] NVARCHAR(300),
	[object_name] NVARCHAR(300),
	[execution_date] DATETIME);

DECLARE @resultEvent TABLE 
	([Id] INT,
	 [registration_number] INT,
	 [event_class_name] NVARCHAR(300),
	 [active] BIT,
	 [event_object] NVARCHAR(MAX),
	 [code] NVARCHAR(50),
	 [event_organization_name] NVARCHAR(300),
	 [question_object] NVARCHAR(300),
	 [start_date] DATETIME,
	 [plan_end_date] DATETIME);

-- Надійшло
IF (@code = N'new_assignemnt')
BEGIN
	INSERT INTO @resultAssignment
	SELECT 
		ass.[Id],
		q.[registration_number],
		ass_st.[name],
		@code,
		org.[name],
		p_exec.[name],
		qt.[name],
		obj.[name],
		ass.[execution_date]
	FROM dbo.[Organizations] org
	INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
		AND ass.[assignment_state_id] = 1 
		AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
		AND ass.[registration_date] >= @startDate
	LEFT JOIN dbo.[Positions] p_exec ON p_exec.[Id] = ass.[executor_person_id] 
	LEFT JOIN dbo.[AssignmentStates] ass_st ON ass_st.[Id] = ass.[assignment_state_id]
	LEFT JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
	LEFT JOIN dbo.[Objects] obj ON obj.[id] = q.[object_id]
	LEFT JOIN dbo.[QuestionTypes] qt ON q.[question_type_id] = qt.[Id];
END
-- В роботі Доручень 
ELSE IF (@code = N'in_work_assignment')
BEGIN
	INSERT INTO @resultAssignment
	SELECT 
		ass.[Id],
		q.[registration_number],
		ass_st.[name],
		@code,
		org.[name],
		p_exec.[name],
		qt.[name],
		obj.[name],
		ass.[execution_date]
	FROM dbo.[Organizations] org
	INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
		AND ass.[assignment_state_id] = 2 
		AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
		AND ass.[registration_date] >= @startDate
	LEFT JOIN dbo.[Positions] p_exec ON p_exec.[Id] = ass.[executor_person_id] 
	LEFT JOIN dbo.[AssignmentStates] ass_st ON ass_st.[Id] = ass.[assignment_state_id]
	LEFT JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
	LEFT JOIN dbo.[Objects] obj ON obj.[id] = q.[object_id]
	LEFT JOIN dbo.[QuestionTypes] qt ON q.[question_type_id] = qt.[Id];
END
-- В роботі Заходів  
ELSE IF (@code = N'in_work_event')
BEGIN
INSERT INTO @resultEvent
SELECT
DISTINCT
	e.[Id],
	e.[Id],
	ec.[name],
	e.[active],
	event_object = STUFF(
       (SELECT ', ' + o.[name]
        FROM dbo.[Events] e1
        INNER JOIN dbo.[EventObjects] eo ON e1.Id = eo.[event_id]
		INNER JOIN dbo.[Objects] o ON o.[Id] = eo.[object_id]
        WHERE eo.[event_id] = e.[Id]
        FOR XML PATH('')), 1, 1, ''),
	@code,
	org.[name],
	qobj.[name],
	e.[start_date],
	e.[plan_end_date]
FROM dbo.[Organizations] org
INNER JOIN dbo.[EventOrganizers] eo ON eo.[organization_id] = org.[Id]
	AND eo.[organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Events] e ON e.[Id] = eo.[event_id]
	AND e.[active] = 1 
	AND e.[start_date] < @now 
	AND e.[plan_end_date] > @now
LEFT JOIN dbo.[Event_Class] ec ON ec.[Id] = e.[event_class_id]
LEFT JOIN dbo.[Questions] q ON q.[event_id] = e.[Id] 
LEFT JOIN dbo.[Objects] qobj ON qobj.[Id] = q.[object_id];
END
-- Прострочено Доручень 
ELSE IF (@code = N'overdue_assignment')
BEGIN
INSERT INTO @resultAssignment
SELECT 
	ass.[Id],
	q.[registration_number],
	ass_st.[name],
	@code,
	org.[name],
	p_exec.[name],
	qt.[name],
	obj.[name],
	ass.[execution_date]
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] IN (1,2) 
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
	AND q.[control_date] < @now 
LEFT JOIN dbo.[Positions] p_exec ON p_exec.[Id] = ass.[executor_person_id] 
LEFT JOIN dbo.[AssignmentStates] ass_st ON ass_st.[Id] = ass.[assignment_state_id]
LEFT JOIN dbo.[Objects] obj ON obj.[id] = q.[object_id]
LEFT JOIN dbo.[QuestionTypes] qt ON q.[question_type_id] = qt.[Id];
END
-- Прострочено Заходів
ELSE IF (@code = N'overdue_event')
BEGIN   
INSERT INTO @resultEvent
SELECT 
DISTINCT
	e.[Id],
	e.[Id],
	ec.[name],
	e.[active],
	event_object = STUFF(
       (SELECT ', ' + o.[name]
        FROM dbo.[Events] e1
        INNER JOIN dbo.[EventObjects] eo ON e1.Id = eo.[event_id]
		INNER JOIN dbo.[Objects] o ON o.[Id] = eo.[object_id]
        WHERE eo.[event_id] = e.[Id]
        FOR XML PATH('')), 1, 1, ''),
	@code,
	org.[name],
	qobj.[name],
	e.[start_date],
	e.[plan_end_date]
FROM dbo.[Organizations] org
INNER JOIN dbo.[EventOrganizers] eo ON eo.[organization_id] = org.[Id]
	AND eo.[organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Events] e ON e.[Id] = eo.[event_id]
	AND e.[active] = 1 
	AND e.[plan_end_date] < @now 
LEFT JOIN dbo.[Event_Class] ec ON ec.[Id] = e.[event_class_id]
LEFT JOIN dbo.[Questions] q ON q.[event_id] = e.[Id] 
LEFT JOIN dbo.[Objects] qobj ON qobj.[Id] = q.[object_id];
END
-- Увага Доручень 
ELSE IF (@code = N'attention_assignment')
BEGIN   
INSERT INTO @resultAssignment
SELECT 
	ass.[Id],
	q.[registration_number],
	ass_st.[name],
	@code,
	org.[name],
	p_exec.[name],
	qt.[name],
	obj.[name],
	ass.[execution_date]
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] IN (1,2) 
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
	AND q.[control_date] < @now 
	--> до дати контролю залишився 1 день
	AND (CAST(DATEADD(DAY, 1, q.[control_date]) AS DATE) = CAST(q.[control_date] AS DATE) 
	--> залишилося 1/5 часу від дати реєстрації до дати контролю
	OR DATEDIFF(HOUR, q.[registration_date], q.[control_date]) / 5 
	<=  DATEDIFF(HOUR, @now, q.[control_date]) )
LEFT JOIN dbo.[Positions] p_exec ON p_exec.[Id] = ass.[executor_person_id] 
LEFT JOIN dbo.[AssignmentStates] ass_st ON ass_st.[Id] = ass.[assignment_state_id]
LEFT JOIN dbo.[Objects] obj ON obj.[id] = q.[object_id]
LEFT JOIN dbo.[QuestionTypes] qt ON q.[question_type_id] = qt.[Id];
END

-- Увага Заходів  
ELSE IF (@code = N'attention_event')
BEGIN   
INSERT INTO @resultEvent
SELECT 
DISTINCT
	e.[Id],
	e.[Id],
	ec.[name],
	e.[active],
	event_object = STUFF(
       (SELECT ', ' + o.[name]
        FROM dbo.[Events] e1
        INNER JOIN dbo.[EventObjects] eo ON e1.Id = eo.[event_id]
		INNER JOIN dbo.[Objects] o ON o.[Id] = eo.[object_id]
        WHERE eo.[event_id] = e.[Id]
        FOR XML PATH('')), 1, 1, ''),
	@code,
	org.[name],
	qobj.[name],
	e.[start_date],
	e.[plan_end_date]
FROM dbo.[Organizations] org
INNER JOIN dbo.[EventOrganizers] eo ON eo.[organization_id] = org.[Id]
	AND eo.[organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Events] e ON e.[Id] = eo.[event_id]
	AND e.[active] = 1 
	AND e.[start_date] < @now 
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
ELSE IF (@code = N'curatorreturn_assignment')
BEGIN   
INSERT INTO @resultAssignment
SELECT 
	ass.[Id],
	q.[registration_number],
	ass_st.[name],
	@code,
	org.[name],
	p_exec.[name],
	qt.[name],
	obj.[name],
	ass.[execution_date]
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] = 4
	AND ass.[AssignmentResultsId] = 5
	AND ass.[AssignmentResolutionsId] = 7
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
LEFT JOIN dbo.[Positions] p_exec ON p_exec.[Id] = ass.[executor_person_id] 
LEFT JOIN dbo.[AssignmentStates] ass_st ON ass_st.[Id] = ass.[assignment_state_id]
LEFT JOIN dbo.[Objects] obj ON obj.[id] = q.[object_id]
LEFT JOIN dbo.[QuestionTypes] qt ON q.[question_type_id] = qt.[Id];
END
-- Повернені куратором 
ELSE IF (@code = N'applicantreturn_assignment')
BEGIN  
INSERT INTO @resultAssignment
SELECT 
	ass.[Id],
	q.[registration_number],
	ass_st.[name],
	@code,
	org.[name],
	p_exec.[name],
	qt.[name],
	obj.[name],
	ass.[execution_date]
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] = 4
	AND ass.[AssignmentResultsId] = 5
	AND ass.[AssignmentResolutionsId] = 8
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
LEFT JOIN dbo.[Positions] p_exec ON p_exec.[Id] = ass.[executor_person_id] 
LEFT JOIN dbo.[AssignmentStates] ass_st ON ass_st.[Id] = ass.[assignment_state_id]
LEFT JOIN dbo.[Objects] obj ON obj.[id] = q.[object_id]
LEFT JOIN dbo.[QuestionTypes] qt ON q.[question_type_id] = qt.[Id];;
END

DECLARE @direction BIT = IIF(@code LIKE '%assignment',0,1);
IF (@direction = 0)
BEGIN
	SELECT 
		[Id],
		[registration_number],
		[assignment_state],
		[code],
		[executor_organization_name],
		[executor_person_name],
		[question_type_name],
		[object_name],
		[execution_date],
		NULL AS [event_class_name],
		NULL AS [active],
		NULL AS [event_object],
		NULL AS [event_organization_name],
		NULL AS [question_object],
		NULL AS [start_date],
		NULL AS [plan_end_date]
	FROM @resultAssignment
	WHERE #filter_columns#
	  	  #sort_columns#
	OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;
END
ELSE 
BEGIN
	SELECT  
		 [Id],
		 [registration_number],
		 [event_class_name],
		 [active],
		 [event_object],
		 [code],
		 [event_organization_name],
		 [question_object],
		 [start_date],
		 [plan_end_date],
		 NULL AS [assignment_state],
		 NULL AS [executor_organization_name],
		 NULL AS [executor_person_name],
		 NULL AS [executor_person_name],
		 NULL AS [question_type_name],
		 NULL AS [object_name],
		 NULL AS [execution_date]
FROM @resultEvent
WHERE #filter_columns#
	  #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;
END