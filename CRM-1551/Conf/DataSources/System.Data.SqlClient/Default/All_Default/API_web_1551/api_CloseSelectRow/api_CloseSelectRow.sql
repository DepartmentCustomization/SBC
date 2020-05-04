--  DECLARE @ApplicantFromSiteId INT = 22;
--  DECLARE @ApplicantFromSitePhone NVARCHAR(13) = '+380632701143';

SET @ApplicantFromSitePhone = REPLACE(@ApplicantFromSitePhone, '+38', SPACE(0));

---> Получить заявителя в системе по Id с сайта и по номеру телефона (если передан)
DECLARE @ApplicantIn1551 INT = (
  SELECT
    ApplicantId
  FROM
    [CRM_1551_Site_Integration].[dbo].[ApplicantsFromSite]
  WHERE
    Id = @ApplicantFromSiteId
);

DECLARE @ApplicantForPhone TABLE (Id INT);

IF(@ApplicantFromSitePhone IS NOT NULL) 
BEGIN
INSERT INTO
  @ApplicantForPhone(Id)
SELECT
  applicant_id
FROM
  dbo.ApplicantPhones ap
WHERE
  phone_number = @ApplicantFromSitePhone
  AND IsMain = 1;

END
SELECT
  [Appeals].Id AS [AppealId],
  [Appeals].[registration_date],
  [Appeals].[registration_number],
  [AssignmentStates].[name] AS AssignmentStates,
  [AssignmentResults].[name] AS Results,
  [Objects].[name] adress,
  [QuestionTypes].[name] AS QuestionTypes,
  [Questions].question_content,
  [Applicants].full_name,
  [Questions].control_date,
  [AssignmentConsDocuments].content,
  COUNT([AssignmentConsDocFiles].Id) AS CountFiles,
  MainExec.[name] AS Assignment_executor_organization_name,
  [Questions].[object_id],
  [Questions].[geolocation_lat],
  [Questions].[geolocation_lon],
  [MainAss].state_change_date AS Assignment_state_change_date,
	CASE 
		WHEN COUNT([AssignmentConsDocFiles].Id) > 0 
		THEN 1 ELSE 0 
	END AS has_files,
  [MainAssConsRevision].grade
FROM
  [dbo].[Appeals] [Appeals]
  LEFT JOIN [dbo].[Questions] [Questions] ON [Appeals].Id = [Questions].appeal_id
  LEFT JOIN [dbo].[Assignments] [Assignments] ON [Questions].Id = [Assignments].question_id
  LEFT JOIN [dbo].[AssignmentStates] [AssignmentStates] ON [Assignments].assignment_state_id = [AssignmentStates].Id
  LEFT JOIN [dbo].[AssignmentResults] [AssignmentResults] ON [Assignments].AssignmentResultsId = [AssignmentResults].Id
  LEFT JOIN [dbo].[Objects] [Objects] ON [Questions].[object_id] = [Objects].Id
  LEFT JOIN [dbo].[QuestionTypes] [QuestionTypes] ON [Questions].question_type_id = [QuestionTypes].Id
  LEFT JOIN [dbo].[Applicants] [Applicants] ON [Appeals].applicant_id = [Applicants].Id
  LEFT JOIN [dbo].[AssignmentConsiderations] [AssignmentConsiderations] ON [Assignments].Id = [AssignmentConsiderations].assignment_id
  LEFT JOIN [dbo].[AssignmentConsDocuments] [AssignmentConsDocuments] ON [AssignmentConsDocuments].assignment_сons_id = [AssignmentConsiderations].Id
  LEFT JOIN [dbo].[AssignmentConsDocFiles] [AssignmentConsDocFiles] ON [AssignmentConsDocuments].Id = [AssignmentConsDocFiles].assignment_cons_doc_id
  LEFT JOIN [dbo].[Assignments] AS [MainAss] ON [Questions].last_assignment_for_execution_id = [MainAss].Id
  LEFT JOIN [dbo].[Organizations] AS [MainExec] ON [MainAss].executor_organization_id = [MainExec].Id
  LEFT JOIN [dbo].[AssignmentConsiderations] AS [MainAssCons] ON [MainAss].Id = [MainAssCons].assignment_id
  LEFT JOIN [dbo].[AssignmentConsDocuments] AS [MainAssConsDoc] ON [MainAssConsDoc].assignment_сons_id = [MainAssCons].Id
  LEFT JOIN [dbo].[AssignmentConsDocFiles] AS [MainAssConsDocFiles] ON [MainAssConsDoc].Id = [MainAssConsDocFiles].assignment_cons_doc_id
  LEFT JOIN [dbo].[AssignmentRevisions] AS [MainAssConsRevision] ON [MainAssConsRevision].assignment_consideration_іd = [MainAssCons].Id 
WHERE
  [Appeals].applicant_id = @ApplicantIn1551
  AND [AssignmentStates].code = N'Closed'
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
  [AssignmentConsDocuments].content,
  [MainExec].name,
  [Questions].[object_id],
  [Questions].[geolocation_lat],
  [Questions].[geolocation_lon],
  [MainAss].state_change_date,
  [MainAssConsRevision].grade

UNION

SELECT
  [Appeals].Id AS [AppealId],
  [Appeals].[registration_date],
  [Appeals].[registration_number],
  [AssignmentStates].[name] AS AssignmentStates,
  [AssignmentResults].[name] AS Results,
  [Objects].[name] adress,
  [QuestionTypes].[name] AS QuestionTypes,
  [Questions].question_content,
  [Applicants].full_name,
  [Questions].control_date,
  [AssignmentConsDocuments].content,
  COUNT([AssignmentConsDocFiles].Id) AS CountFiles,
  MainExec.[name] AS Assignment_executor_organization_name,
  [Questions].[object_id],
  [Questions].[geolocation_lat],
  [Questions].[geolocation_lon],
  [MainAss].state_change_date AS Assignment_state_change_date,
	CASE 
		WHEN COUNT([AssignmentConsDocFiles].Id) > 0 
		THEN 1 ELSE 0 
	END AS has_files,
	[MainAssConsRevision].grade
FROM
  [dbo].[Appeals] [Appeals]
  LEFT JOIN [dbo].[Questions] [Questions] ON [Appeals].Id = [Questions].appeal_id
  LEFT JOIN [dbo].[Assignments] [Assignments] ON [Questions].Id = [Assignments].question_id
  LEFT JOIN [dbo].[AssignmentStates] [AssignmentStates] ON [Assignments].assignment_state_id = [AssignmentStates].Id
  LEFT JOIN [dbo].[AssignmentResults] [AssignmentResults] ON [Assignments].AssignmentResultsId = [AssignmentResults].Id
  LEFT JOIN [dbo].[Objects] [Objects] ON [Questions].[object_id] = [Objects].Id
  LEFT JOIN [dbo].[QuestionTypes] [QuestionTypes] ON [Questions].question_type_id = [QuestionTypes].Id
  LEFT JOIN [dbo].[Applicants] [Applicants] ON [Appeals].applicant_id = [Applicants].Id
  LEFT JOIN [dbo].[AssignmentConsiderations] [AssignmentConsiderations] ON [Assignments].Id = [AssignmentConsiderations].assignment_id
  LEFT JOIN [dbo].[AssignmentConsDocuments] [AssignmentConsDocuments] ON [AssignmentConsDocuments].assignment_сons_id = [AssignmentConsiderations].Id
  LEFT JOIN [dbo].[AssignmentConsDocFiles] [AssignmentConsDocFiles] ON [AssignmentConsDocuments].Id = [AssignmentConsDocFiles].assignment_cons_doc_id
  LEFT JOIN [dbo].[Assignments] AS [MainAss] ON [Questions].last_assignment_for_execution_id = [MainAss].Id
  LEFT JOIN [dbo].[Organizations] AS [MainExec] ON [MainAss].executor_organization_id = [MainExec].Id
  LEFT JOIN [dbo].[AssignmentConsiderations] AS [MainAssCons] ON [MainAss].Id = [MainAssCons].assignment_id
  LEFT JOIN [dbo].[AssignmentConsDocuments] AS [MainAssConsDoc] ON [MainAssConsDoc].assignment_сons_id = [MainAssCons].Id
  LEFT JOIN [dbo].[AssignmentConsDocFiles] AS [MainAssConsDocFiles] ON [MainAssConsDoc].Id = [MainAssConsDocFiles].assignment_cons_doc_id
  LEFT JOIN [dbo].[AssignmentRevisions] AS [MainAssConsRevision] ON [MainAssConsRevision].assignment_consideration_іd = [MainAssCons].Id 
WHERE
  [Appeals].applicant_id IN (
    SELECT
      Id
    FROM
      @ApplicantForPhone
  )
  AND [AssignmentStates].code = N'Closed'
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
  [AssignmentConsDocuments].content,
  [MainExec].name,
  [Questions].[object_id],
  [Questions].[geolocation_lat],
  [Questions].[geolocation_lon],
  [MainAss].state_change_date,
  [MainAssConsRevision].grade
ORDER BY 1 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY
;