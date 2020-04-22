-- DECLARE @ApplicantFromSiteId INT = 22;
-- DECLARE @ApplicantFromSitePhone NVARCHAR(13) = '+380632701143';

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
  [AssignmentConsDocuments].content,
  count([AssignmentConsDocFiles].Id) CountFiles
FROM
  [CRM_1551_Analitics].[dbo].[Appeals]
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Questions] ON [Appeals].Id = [Questions].appeal_id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Assignments] ON [Questions].Id = [Assignments].question_id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentStates] ON [Assignments].assignment_state_id = [AssignmentStates].Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentResults] ON [Assignments].AssignmentResultsId = [AssignmentResults].Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Objects] ON [Questions].object_id = [Objects].Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[QuestionTypes] ON [Questions].question_type_id = [QuestionTypes].Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Applicants] ON [Appeals].applicant_id = [Applicants].Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentConsiderations] ON [Assignments].Id = [AssignmentConsiderations].assignment_id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentConsDocuments] ON [AssignmentConsDocuments].assignment_сons_id = [AssignmentConsiderations].Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentConsDocFiles] ON [AssignmentConsDocuments].Id = [AssignmentConsDocFiles].assignment_cons_doc_id
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
  [AssignmentConsDocuments].content

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
  [AssignmentConsDocuments].content,
  count([AssignmentConsDocFiles].Id) CountFiles
FROM
  [CRM_1551_Analitics].[dbo].[Appeals]
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Questions] ON [Appeals].Id = [Questions].appeal_id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Assignments] ON [Questions].Id = [Assignments].question_id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentStates] ON [Assignments].assignment_state_id = [AssignmentStates].Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentResults] ON [Assignments].AssignmentResultsId = [AssignmentResults].Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Objects] ON [Questions].object_id = [Objects].Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[QuestionTypes] ON [Questions].question_type_id = [QuestionTypes].Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[Applicants] ON [Appeals].applicant_id = [Applicants].Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentConsiderations] ON [Assignments].Id = [AssignmentConsiderations].assignment_id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentConsDocuments] ON [AssignmentConsDocuments].assignment_сons_id = [AssignmentConsiderations].Id
  LEFT JOIN [CRM_1551_Analitics].[dbo].[AssignmentConsDocFiles] ON [AssignmentConsDocuments].Id = [AssignmentConsDocFiles].assignment_cons_doc_id
WHERE
  [Appeals].applicant_id IN (SELECT 
								Id
							 FROM @ApplicantForPhone)
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
  [AssignmentConsDocuments].content
	#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;