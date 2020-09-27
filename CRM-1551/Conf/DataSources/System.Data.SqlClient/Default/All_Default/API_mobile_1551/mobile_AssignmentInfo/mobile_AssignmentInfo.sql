-- DECLARE @userId NVARCHAR(128) = N'646d6b5e-9f27-4764-9612-f18d04fea509',
-- 		@assignmentId INT = 3989092;

DECLARE @orgId INT;
SELECT 
	@orgId = [executor_organization_id]
FROM dbo.[Assignments] 
WHERE Id = @assignmentId;

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

IF(@orgId NOT IN (SELECT [Id] FROM @InUserResponseRights))
BEGIN
	RAISERROR(N'Користувач не має доступу до даної організації', 16, 1);
	RETURN;
END

DECLARE @rework_count INT;
SELECT 
	@rework_count = rework_counter
FROM dbo.[AssignmentRevisions]
WHERE assignment_consideration_іd = (SELECT 
										  MAX(Id)
									 FROM dbo.[AssignmentConsiderations]
									 WHERE [assignment_id] = @assignmentId);

DECLARE @executor_answer NVARCHAR(MAX);
SELECT 
TOP 1
	@executor_answer = [short_answer]
FROM [dbo].[AssignmentConsiderations]
WHERE [assignment_id] = @assignmentId
AND [short_answer] IS NOT NULL
ORDER BY [create_date] DESC;

DECLARE @AssignmentConsDocuments_Row NVARCHAR(MAX) = 
		   STUFF((SELECT '. '+ [name] 
		   + ': ' + [content] 
		   + N' Дата додання: ' + CONVERT(VARCHAR(10), [add_date], 23)
           FROM [dbo].[AssignmentConsDocuments]
		   WHERE [assignment_сons_id] IN (SELECT 
											[Id] 
										  FROM dbo.AssignmentConsiderations 
										  WHERE [assignment_id] = @assignmentId)
           FOR XML PATH('')), 1, 1, '');

SELECT
DISTINCT 
	q.[registration_date],
	applicant.[full_name],
	appeal.[ApplicantAddress],
	obj.[name] AS [object_name],
	balans_org.[short_name] AS [balans_org_name],
	q_org.[short_name] AS [organization_name],
	qt.[name] AS [question_type_name],
	q.[question_content],
	ass_state.[name] AS [assignment_state_name],
	ass_result.[name] AS [assignment_result_name],
	ass_resolution.[name] AS [assignment_resolution_name],
	@rework_count AS [rework_counter],
	appeal.[enter_number],
	ass_exec_org.[short_name] AS [executor_organization_name],
	IIF(ass_exec_pos.[phone_number] IS NULL,
		ass_exec_org_main_pos.[phone_number],
		ass_exec_pos.[phone_number])
		AS [executor_phone_number],
	ass_received_org.[short_name] AS [received_organization_name],
	@executor_answer AS [short_answer],
	IIF(COUNT(q_doc_files.[Id]) > 0, 1, 0) AS [is_question_files_exists],
	ass.[execution_date],
	q.[event_id],
	trim(@AssignmentConsDocuments_Row) AS [assignment_documents],
	IIF(COUNT(cons_doc_file.[Id]) > 0, 1, 0) AS [is_documents_files_exists]
FROM [dbo].[Assignments] ass
LEFT JOIN [dbo].[AssignmentConsiderations] ass_cons ON ass_cons.[assignment_id] = ass.[Id]
LEFT JOIN [dbo].[AssignmentConsDocuments] cons_doc ON cons_doc.[assignment_сons_id] = ass_cons.[Id]
LEFT JOIN [dbo].[AssignmentConsDocFiles] cons_doc_file ON cons_doc_file.[assignment_cons_doc_id] = cons_doc.[Id]
LEFT JOIN [dbo].[Organizations] ass_exec_org ON ass_exec_org.[Id] = ass.[executor_organization_id]
LEFT JOIN [dbo].[Organizations] ass_received_org ON ass_received_org.[Id] = ass.[organization_id]
LEFT JOIN [dbo].[Positions] ass_exec_pos ON ass_exec_pos.[Id] = ass.[executor_person_id]
LEFT JOIN [dbo].[Positions] ass_exec_org_main_pos ON ass_exec_org_main_pos.[organizations_id] = ass_exec_org.[Id] 
	AND ass_exec_org_main_pos.[is_main] = 1 
LEFT JOIN [dbo].[AssignmentStates] ass_state ON ass_state.[Id] = ass.[assignment_state_id]
LEFT JOIN [dbo].[AssignmentResults] ass_result ON ass_result.[Id] = ass.[AssignmentResultsId]
LEFT JOIN [dbo].[AssignmentResolutions] ass_resolution ON ass_resolution.[Id] = ass.[AssignmentResolutionsId]
INNER JOIN [dbo].[Questions] q ON ass.[question_id] = q.[Id]
LEFT JOIN [dbo].[QuestionDocFiles] q_doc_files ON q_doc_files.[question_id] = q.[Id]
LEFT JOIN [dbo].[QuestionTypes] qt ON qt.[Id] = q.[question_type_id]
LEFT JOIN [dbo].[Organizations] q_org ON q_org.[Id] = q.[organization_id]
LEFT JOIN [dbo].[Objects] obj ON obj.Id = q.[object_id]
LEFT JOIN [dbo].[ExecutorInRoleForObject] exec_obj ON exec_obj.[object_id] = obj.[Id]
	AND [executor_role_id] = 1
LEFT JOIN [dbo].[Organizations] balans_org ON balans_org.[Id] = exec_obj.[executor_id]
INNER JOIN [dbo].[Appeals] appeal ON appeal.[Id] = q.[appeal_id]
LEFT JOIN [dbo].[Applicants] applicant ON applicant.[Id] = appeal.[applicant_id]
WHERE ass.[Id] = @assignmentId
GROUP BY q.[registration_date], 
		 applicant.[full_name], 
		 appeal.[ApplicantAddress],
		 obj.[name],
		 balans_org.[short_name],
		 q_org.[short_name],
		 qt.[name],
		 q.[question_content],
		 ass_state.[name],
		 ass_result.[name],
		 ass_resolution.[name],
		 appeal.[enter_number],
		 ass_exec_org.[short_name],
		 ass_exec_pos.[phone_number],
		 ass_exec_org_main_pos.[phone_number],
		 ass_received_org.[short_name],
		 ass.[execution_date],
		 q.[event_id]
ORDER BY 1
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;