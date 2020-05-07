--    DECLARE @ApplicantFromSiteId INT = 22;
--    DECLARE @ApplicantFromSitePhone NVARCHAR(13) = '+380632701143';

SET @ApplicantFromSitePhone = REPLACE(@ApplicantFromSitePhone, '+38', SPACE(0));

---> Получить заявителя в системе по Id с сайта и по номеру телефона (если передан)
DECLARE @ApplicantIn1551 INT = (SELECT 
									ApplicantId 
								 FROM [CRM_1551_Site_Integration].[dbo].[ApplicantsFromSite]
								 WHERE Id = @ApplicantFromSiteId);


DECLARE @ApplicantForPhone TABLE (Id INT);
IF(@ApplicantFromSitePhone IS NOT NULL)
BEGIN
INSERT INTO @ApplicantForPhone(Id)
	SELECT 
		applicant_id
	FROM dbo.ApplicantPhones ap
	WHERE phone_number = @ApplicantFromSitePhone
	AND IsMain = 1;
END

SELECT
	[Appeals].Id AS [AppealId],
	[Appeals].registration_date,
	[Appeals].registration_number,
	[AssignmentStates].name AssignmentStates,
	[AssignmentResults].name Results,
	[Objects].name adress,
	[QuestionTypes].name QuestionTypes,
	[Questions].question_content,
	[Applicants].full_name,
	[Questions].control_date,
	CASE
		WHEN [AssignmentStates].code = N'OnCheck'
		AND [AssignmentResults].code = N'Done' THEN 1
		ELSE 0
	END PossibleEvaluation,
	MainExec.[name] AS Assignment_executor_organization_name,
	[Questions].[object_id],
	[Questions].[geolocation_lat],
	[Questions].[geolocation_lon],
	[MainAss].state_change_date AS Assignment_state_change_date,
	CASE 
		WHEN COUNT([MainAssConsDocsFiles].Id) > 0 
		THEN 1 ELSE 0 
	END AS has_files,
	[MainAssConsDocs].content AS main_content
FROM
	[dbo].[Appeals] [Appeals]
	LEFT JOIN [dbo].[Questions] [Questions] ON [Appeals].Id = [Questions].appeal_id
	LEFT JOIN [dbo].[Assignments] [Assignments] ON [Questions].Id = [Assignments].question_id
	LEFT JOIN [dbo].[Objects] [Objects] ON [Questions].[object_id] = [Objects].Id
	LEFT JOIN [dbo].[QuestionTypes] [QuestionTypes] ON [Questions].question_type_id = [QuestionTypes].Id
	LEFT JOIN [dbo].[Applicants] [Applicants] ON [Appeals].applicant_id = [Applicants].Id
	LEFT JOIN [dbo].[Assignments] AS [MainAss] ON [Questions].last_assignment_for_execution_id = [MainAss].Id
	LEFT JOIN [dbo].[Organizations] AS [MainExec] ON [MainAss].executor_organization_id = [MainExec].Id
	LEFT JOIN [dbo].[AssignmentConsiderations] [MainAssCons] ON [MainAssCons].assignment_id = [MainAss].Id
	LEFT JOIN [dbo].[AssignmentConsDocuments] [MainAssConsDocs] ON [MainAssConsDocs].assignment_сons_id = [MainAssCons].Id 
	LEFT JOIN [dbo].[AssignmentConsDocFiles] [MainAssConsDocsFiles] ON [MainAssConsDocsFiles].assignment_cons_doc_id = [MainAssConsDocs].Id
	LEFT JOIN [dbo].[AssignmentStates] [AssignmentStates] ON [MainAss].assignment_state_id = [AssignmentStates].Id
	LEFT JOIN [dbo].[AssignmentResults] [AssignmentResults] ON [MainAss].AssignmentResultsId = [AssignmentResults].Id
WHERE
	[Appeals].applicant_id = @ApplicantFromSiteId
	/*START CRM1551-397*/
	AND [Questions].[question_state_id] = 3
	/*На перевірці*/
	AND [Assignments].AssignmentResultsId = 4
	/*Виконано*/
	/*END CRM1551-397*/
GROUP BY 
	[Appeals].Id,
	[Appeals].registration_date,
	[Appeals].registration_number,
	[AssignmentStates].name,
	[AssignmentResults].name,
	[Objects].name,
	[QuestionTypes].name,
	[Questions].question_content,
	[Applicants].full_name,
	[Questions].control_date,
	[AssignmentStates].code,
	[AssignmentResults].code,
	MainExec.[name],
	[Questions].[object_id],
	[Questions].[geolocation_lat],
	[Questions].[geolocation_lon],
	[MainAss].state_change_date,
	[MainAssConsDocs].content

UNION 

SELECT
	[Appeals].Id AS [AppealId],
	[Appeals].registration_date,
	[Appeals].registration_number,
	[AssignmentStates].name AssignmentStates,
	[AssignmentResults].name Results,
	[Objects].name adress,
	[QuestionTypes].name QuestionTypes,
	[Questions].question_content,
	[Applicants].full_name,
	[Questions].control_date,
	CASE
		WHEN [AssignmentStates].code = N'OnCheck'
		AND [AssignmentResults].code = N'Done' THEN 1
		ELSE 0
	END PossibleEvaluation,
	MainExec.[name] AS Assignment_executor_organization_name,
	[Questions].[object_id],
	[Questions].[geolocation_lat],
	[Questions].[geolocation_lon],
	[MainAss].state_change_date AS Assignment_state_change_date,
	CASE 
		WHEN COUNT([MainAssConsDocsFiles].Id) > 0 
		THEN 1 ELSE 0 
	END AS has_files,
	[MainAssConsDocs].content AS main_content
FROM
	[dbo].[Appeals] [Appeals]
	LEFT JOIN [dbo].[Questions] [Questions] ON [Appeals].Id = [Questions].appeal_id
	LEFT JOIN [dbo].[Assignments] [Assignments] ON [Questions].Id = [Assignments].question_id
	LEFT JOIN [dbo].[Objects] [Objects] ON [Questions].[object_id] = [Objects].Id
	LEFT JOIN [dbo].[QuestionTypes] [QuestionTypes] ON [Questions].question_type_id = [QuestionTypes].Id
	LEFT JOIN [dbo].[Applicants] [Applicants] ON [Appeals].applicant_id = [Applicants].Id
	LEFT JOIN [dbo].[Assignments] AS [MainAss] ON [Questions].last_assignment_for_execution_id = [MainAss].Id
	LEFT JOIN [dbo].[Organizations] AS [MainExec] ON [MainAss].executor_organization_id = [MainExec].Id
	LEFT JOIN [dbo].[AssignmentConsiderations] [MainAssCons] ON [MainAssCons].assignment_id = [MainAss].Id
	LEFT JOIN [dbo].[AssignmentConsDocuments] [MainAssConsDocs] ON [MainAssConsDocs].assignment_сons_id = [MainAssCons].Id 
	LEFT JOIN [dbo].[AssignmentConsDocFiles] [MainAssConsDocsFiles] ON [MainAssConsDocsFiles].assignment_cons_doc_id = [MainAssConsDocs].Id
	LEFT JOIN [dbo].[AssignmentStates] [AssignmentStates] ON [MainAss].assignment_state_id = [AssignmentStates].Id
	LEFT JOIN [dbo].[AssignmentResults] [AssignmentResults] ON [MainAss].AssignmentResultsId = [AssignmentResults].Id
WHERE
	[Appeals].applicant_id IN (SELECT 
									Id
							   FROM @ApplicantForPhone)
	/*START CRM1551-397*/
	AND [Questions].[question_state_id] = 3
	/*На перевірці*/
	AND [Assignments].AssignmentResultsId = 4
	/*Виконано*/
	/*END CRM1551-397*/
GROUP BY 
	[Appeals].Id,
	[Appeals].registration_date,
	[Appeals].registration_number,
	[AssignmentStates].name,
	[AssignmentResults].name,
	[Objects].name,
	[QuestionTypes].name,
	[Questions].question_content,
	[Applicants].full_name,
	[Questions].control_date,
	[AssignmentStates].code,
	[AssignmentResults].code,
	MainExec.[name],
	[Questions].[object_id],
	[Questions].[geolocation_lat],
	[Questions].[geolocation_lon],
	[MainAss].state_change_date,
	[MainAssConsDocs].content
ORDER BY 1
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY 
;