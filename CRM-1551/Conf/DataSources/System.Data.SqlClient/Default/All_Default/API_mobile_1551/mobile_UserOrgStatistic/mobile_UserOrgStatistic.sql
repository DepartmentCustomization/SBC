-- DECLARE @userId NVARCHAR(128) = N'eb6d56d2-e217-45e4-800b-c851666ce795';
-- DECLARE @orgId INT = null;

DECLARE @user_position TABLE (Id INT);
INSERT INTO @user_position
SELECT 
	[Id]
FROM dbo.Positions 
WHERE [programuser_id] = @userId;

DECLARE @InUserResponseRights TABLE (Id INT);
INSERT INTO @InUserResponseRights
SELECT 
DISTINCT 
	[organization_id]
FROM [dbo].[OrganizationInResponsibilityRights]
WHERE [position_id] IN (SELECT [Id] FROM @user_position);

DECLARE @user_orgs TABLE (Id INT, code INT);
DECLARE @now DATETIME = GETUTCDATE();

IF (@orgId IS NULL)
BEGIN
	INSERT INTO @user_orgs
	SELECT 
	DISTINCT 
		o.[Id],
		o.[organization_code]
	FROM [dbo].[OrganizationInResponsibilityRights] org_r
	INNER JOIN [dbo].[Organizations] o ON o.Id = org_r.organization_id
	WHERE [position_id] IN (SELECT Id FROM @user_position);
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
	WHERE [Id] = @orgId;
END

-- Надійшло
DECLARE @new_assignemnt TABLE (org_code INT, val INT);
INSERT INTO @new_assignemnt
SELECT 
	org.[organization_code],
	COUNT(ass.[Id])
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] = 1 
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
	GROUP BY org.[organization_code];

-- В роботі Доручень 
DECLARE @in_work_assignment TABLE (org_code INT, val INT);
INSERT INTO @in_work_assignment
SELECT 
	org.[organization_code],
	COUNT(ass.[Id])
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] = 2 
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
	GROUP BY org.[organization_code];

-- В роботі Заходів  
DECLARE @in_work_event TABLE (org_code INT, val INT);
INSERT INTO @in_work_event
SELECT 
	org.[organization_code],
	COUNT(e.[Id])
FROM dbo.[Organizations] org
INNER JOIN dbo.[EventOrganizers] eo ON eo.[organization_id] = org.[Id]
	AND eo.[organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Events] e ON e.[Id] = eo.[event_id]
	AND e.[active] = 1 
	AND e.[start_date] < @now 
	AND e.[plan_end_date] > @now 
	GROUP BY org.[organization_code];

-- Прострочено Доручень 
DECLARE @overdue_assignment TABLE (org_code INT, val INT);
INSERT INTO @overdue_assignment
SELECT 
	org.[organization_code],
	COUNT(ass.[Id])
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] IN (1,2) 
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Questions] q ON q.[Id] = ass.[question_id]
	AND q.[control_date] < @now 
	GROUP BY org.[organization_code];

-- Прострочено Заходів   
DECLARE @overdue_event TABLE (org_code INT, val INT);
INSERT INTO @overdue_event
SELECT 
	org.[organization_code],
	COUNT(e.[Id])
FROM dbo.[Organizations] org
INNER JOIN dbo.[EventOrganizers] eo ON eo.[organization_id] = org.[Id]
	AND eo.[organization_id] IN (SELECT [Id] FROM @user_orgs)
INNER JOIN dbo.[Events] e ON e.[Id] = eo.[event_id]
	AND e.[active] = 1 
	AND e.[plan_end_date] < @now 
	GROUP BY org.[organization_code];

-- Увага Доручень 
DECLARE @attention_assignment TABLE (org_code INT, val INT);
INSERT INTO @attention_assignment
SELECT 
	org.[organization_code],
	COUNT(ass.[Id])
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
	GROUP BY org.[organization_code];

-- Увага Заходів  
DECLARE @attention_event TABLE (org_code INT, val INT);
INSERT INTO @attention_event
SELECT 
	org.[organization_code],
	COUNT(e.[Id])
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
	GROUP BY org.[organization_code];

-- Повернені куратором 
DECLARE @curatorreturn_assignment TABLE (org_code INT, val INT);
INSERT INTO @curatorreturn_assignment
SELECT 
	org.[organization_code],
	COUNT(ass.[Id])
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] = 4
	AND ass.[AssignmentResultsId] = 5
	AND ass.[AssignmentResolutionsId] = 7
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
	GROUP BY org.[organization_code];

-- Повернені куратором 
DECLARE @applicantreturn_assignment TABLE (org_code INT, val INT);
INSERT INTO @applicantreturn_assignment
SELECT 
	org.[organization_code],
	COUNT(ass.[Id])
FROM dbo.[Organizations] org
INNER JOIN dbo.[Assignments] ass ON ass.[executor_organization_id] = org.[Id]
	AND ass.[assignment_state_id] = 4
	AND ass.[AssignmentResultsId] = 5
	AND ass.[AssignmentResolutionsId] = 8
	AND ass.[executor_organization_id] IN (SELECT [Id] FROM @user_orgs)
	GROUP BY org.[organization_code];


SELECT 
DISTINCT
	uo.[code],
	ISNULL(na.[val],0) AS new_assignemnt,
	ISNULL(iwa.[val],0) AS in_work_assignment,
	ISNULL(iwe.[val],0) AS in_work_event,
	ISNULL(oa.[val],0) AS overdue_assignment,
	ISNULL(oe.[val],0) AS overdue_event,
	ISNULL(aa.[val],0) AS attention_assignment,
	ISNULL(ae.[val],0) AS attention_event,
	ISNULL(cra.[val],0) AS curatorreturn_assignment,
	ISNULL(ara.[val],0) AS applicantreturn_assignment
FROM @user_orgs uo 
LEFT JOIN @new_assignemnt na ON na.[org_code] = uo.[code]
LEFT JOIN @in_work_assignment iwa ON iwa.[org_code] = uo.[code]
LEFT JOIN @in_work_event iwe ON iwe.[org_code] = uo.[code]
LEFT JOIN @overdue_assignment oa ON oa.[org_code] = uo.[code]
LEFT JOIN @overdue_event oe ON oe.[org_code] = uo.[code]
LEFT JOIN @attention_assignment aa ON aa.[org_code] = uo.[code]
LEFT JOIN @attention_event ae ON ae.[org_code] = uo.[code]
LEFT JOIN @curatorreturn_assignment cra ON cra.[org_code] = uo.[code]
LEFT JOIN @applicantreturn_assignment ara ON ara.[org_code] = uo.[code]
WHERE #filter_columns#
	  #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;