-- DECLARE @Id INT = 2810750;

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
DECLARE @LocalArchive NVARCHAR(20) = N'DB.UKRODS.CF';

DECLARE @IsHere BIT = IIF(
   (
      SELECT
         COUNT(1)
      FROM
         dbo.Assignments
      WHERE
        Id = @Id
   ) = 0,
   0,
   1
);

IF(@IsHere = 1)
BEGIN
SELECT
	[Assignments].[Id],
	Assignments.question_id,
	[Assignments].[registration_date],
	ast.id AS ass_state_id,
	ast.name AS ass_state_name,
	assR.name AS result_name,
	assR.Id AS result_id,
	assRn.name AS resolution_name,
	assRn.Id AS resolution_id,
	[Assignments].[execution_date],
	assC.short_answer,
	aty.Id AS ass_type_id,
	aty.name AS ass_type_name,
	Assignments.main_executor,
	perf.Id AS performer_id,
CASE
		WHEN len(perf.[head_name]) > 5 THEN perf.[head_name] + ' ( ' + perf.[short_name] + ')'
		ELSE perf.[short_name]
	END AS performer_name,
CASE
		WHEN len(responsible.[head_name]) > 5 THEN responsible.[head_name] + ' ( ' + responsible.[short_name] + ')'
		ELSE responsible.[short_name]
	END AS responsible_name,
	responsible.Id AS responsible,
(
		SELECT
			Id
		FROM
			AssignmentConsiderations
		WHERE
			Id = (
				SELECT
					current_assignment_consideration_id
				FROM
					Assignments
				WHERE
					Id = @Id
			)
	) AS assignmentConsiderations_id,
(
		SELECT
			count(assg.main_executor)
		FROM
			[Assignments] assg
		WHERE
			assg.question_id = Assignments.question_id
			AND assg.main_executor = 1
			AND assg.close_date IS NULL
	) AS is_aktiv_true,
	assRev.control_comment,
	isnull(assRev.rework_counter, 0) AS rework_counter,
	assC.[transfer_to_organization_id],
	org_tr.short_name AS transfer_name,
	'1' AS is_view
FROM
	[dbo].[Assignments] [Assignments]
	LEFT JOIN dbo.AssignmentTypes aty ON aty.Id = Assignments.assignment_type_id
	LEFT JOIN dbo.AssignmentStates ast ON ast.Id = Assignments.assignment_state_id 
	LEFT JOIN dbo.AssignmentConsiderations assC ON assC.Id = Assignments.current_assignment_consideration_id
	LEFT JOIN dbo.AssignmentResults assR ON assR.Id = Assignments.AssignmentResultsId
	LEFT JOIN dbo.AssignmentResolutions assRn ON assRn.Id = Assignments.AssignmentResolutionsId
	LEFT JOIN dbo.AssignmentRevisions assRev ON assRev.assignment_consideration_іd = assC.Id
	LEFT JOIN dbo.Organizations AS perf ON perf.Id = Assignments.executor_organization_id
	LEFT JOIN dbo.Organizations AS responsible ON responsible.Id = Assignments.organization_id
	LEFT JOIN dbo.Organizations AS org_tr ON org_tr.Id = assC.transfer_to_organization_id
WHERE
	Assignments.Id = @Id ;
END

ELSE IF(@IsHere = 0)
BEGIN
DECLARE @Query NVARCHAR(MAX);
---> Check is connection to Archive db exists
DECLARE @ProdArchiveServerID SMALLINT = (SELECT server_id FROM sys.servers WHERE [name] = @Archive);
DECLARE @LocalArchiveServerID SMALLINT = (SELECT server_id FROM sys.servers WHERE [name] = @LocalArchive);

IF (@ProdArchiveServerID IS NULL)
AND (@LocalArchiveServerID IS NOT NULL)
BEGIN
SET @Query = 
N'SELECT
	[Assignments].[Id],
	Assignments.question_id,
	[Assignments].[registration_date],
	ast.id AS ass_state_id,
	ast.name AS ass_state_name,
	assR.name AS result_name,
	assR.Id AS result_id,
	assRn.name AS resolution_name,
	assRn.Id AS resolution_id,
	[Assignments].[execution_date],
	assC.short_answer,
	aty.Id AS ass_type_id,
	aty.name AS ass_type_name,
	Assignments.main_executor,
	perf.Id AS performer_id,
CASE
		WHEN len(perf.[head_name]) > 5 THEN perf.[head_name] + N'' ( '' + perf.[short_name] + N'')''
		ELSE perf.[short_name]
	END AS performer_name,
CASE
		WHEN len(responsible.[head_name]) > 5 THEN responsible.[head_name] + N'' ( '' + responsible.[short_name] + N'')''
		ELSE responsible.[short_name]
	END AS responsible_name,
	responsible.Id AS responsible,
(
		SELECT
			Id
		FROM
			[DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[AssignmentConsiderations]
		WHERE
			Id = (
				SELECT
					current_assignment_consideration_id
				FROM
					[DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[Assignments]
				WHERE
					Id = @Id
			)
	) AS assignmentConsiderations_id,
(
		SELECT
			count(assg.main_executor)
		FROM
			[DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[Assignments] assg
		WHERE
			assg.question_id = Assignments.question_id
			AND assg.main_executor = 1
			AND assg.close_date IS NULL
	) AS is_aktiv_true,
	assRev.control_comment,
	isnull(assRev.rework_counter, 0) AS rework_counter,
	assC.[transfer_to_organization_id],
	org_tr.short_name AS transfer_name,
	N''1'' AS is_view
FROM
	[DB.UKRODS.CF].[CRM_1551_Analitics].dbo.[Assignments] [Assignments]
	LEFT JOIN dbo.AssignmentTypes aty ON aty.Id = Assignments.assignment_type_id
	LEFT JOIN dbo.AssignmentStates ast ON ast.Id = Assignments.assignment_state_id 
	LEFT JOIN [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].AssignmentConsiderations assC ON assC.Id = Assignments.current_assignment_consideration_id
	LEFT JOIN dbo.AssignmentResults assR ON assR.Id = Assignments.AssignmentResultsId
	LEFT JOIN dbo.AssignmentResolutions assRn ON assRn.Id = Assignments.AssignmentResolutionsId
	LEFT JOIN [DB.UKRODS.CF].[CRM_1551_Analitics].dbo.AssignmentRevisions assRev ON assRev.assignment_consideration_іd = assC.Id
	LEFT JOIN dbo.Organizations AS perf ON perf.Id = Assignments.executor_organization_id
	LEFT JOIN dbo.Organizations AS responsible ON responsible.Id = Assignments.organization_id
	LEFT JOIN dbo.Organizations AS org_tr ON org_tr.Id = assC.transfer_to_organization_id
WHERE
	Assignments.Id = @Id ;';

	EXEC sp_executesql @Query, N'@Id INT', 
								@Id = @Id;
END

ELSE IF(@ProdArchiveServerID IS NOT NULL)
AND (@LocalArchiveServerID IS NULL)
BEGIN 
SET @Query = 
N'SELECT
	[Assignments].[Id],
	Assignments.question_id,
	[Assignments].[registration_date],
	ast.id AS ass_state_id,
	ast.name AS ass_state_name,
	assR.name AS result_name,
	assR.Id AS result_id,
	assRn.name AS resolution_name,
	assRn.Id AS resolution_id,
	[Assignments].[execution_date],
	assC.short_answer,
	aty.Id AS ass_type_id,
	aty.name AS ass_type_name,
	Assignments.main_executor,
	perf.Id AS performer_id,
CASE
		WHEN len(perf.[head_name]) > 5 THEN perf.[head_name] + N'' ( '' + perf.[short_name] + N'')''
		ELSE perf.[short_name]
	END AS performer_name,
CASE
		WHEN len(responsible.[head_name]) > 5 THEN responsible.[head_name] + N'' ( '' + responsible.[short_name] + N'')''
		ELSE responsible.[short_name]
	END AS responsible_name,
	responsible.Id AS responsible,
(
		SELECT
			Id
		FROM
			[10.192.200.182].[CRM_1551_Analitics].[dbo].AssignmentConsiderations
		WHERE
			Id = (
				SELECT
					current_assignment_consideration_id
				FROM
					Assignments
				WHERE
					Id = @Id
			)
	) AS assignmentConsiderations_id,
(
		SELECT
			count(assg.main_executor)
		FROM
			[10.192.200.182].[CRM_1551_Analitics].[dbo].[Assignments] assg
		WHERE
			assg.question_id = Assignments.question_id
			AND assg.main_executor = 1
			AND assg.close_date IS NULL
	) AS is_aktiv_true,
	assRev.control_comment,
	isnull(assRev.rework_counter, 0) AS rework_counter,
	assC.[transfer_to_organization_id],
	org_tr.short_name AS transfer_name,
	N''1'' AS is_view
FROM
	[10.192.200.182].[CRM_1551_Analitics].[dbo].[Assignments] [Assignments]
	LEFT JOIN dbo.AssignmentTypes aty ON aty.Id = Assignments.assignment_type_id
	LEFT JOIN dbo.AssignmentStates ast ON ast.Id = Assignments.assignment_state_id 
	LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].AssignmentConsiderations assC ON assC.Id = Assignments.current_assignment_consideration_id
	LEFT JOIN dbo.AssignmentResults assR ON assR.Id = Assignments.AssignmentResultsId
	LEFT JOIN dbo.AssignmentResolutions assRn ON assRn.Id = Assignments.AssignmentResolutionsId
	LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].AssignmentRevisions assRev ON assRev.assignment_consideration_іd = assC.Id
	LEFT JOIN dbo.Organizations AS perf ON perf.Id = Assignments.executor_organization_id
	LEFT JOIN dbo.Organizations AS responsible ON responsible.Id = Assignments.organization_id
	LEFT JOIN dbo.Organizations AS org_tr ON org_tr.Id = assC.transfer_to_organization_id
WHERE
	Assignments.Id = @Id ;';

	EXEC sp_executesql @Query, N'@Id INT', 
								@Id = @Id;
END
END