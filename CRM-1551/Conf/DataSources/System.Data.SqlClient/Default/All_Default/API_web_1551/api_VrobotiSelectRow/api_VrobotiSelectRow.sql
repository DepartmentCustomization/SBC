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
	[Objects].[name] AS adress,
	[QuestionTypes].[name] AS QuestionTypes,
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
	[Questions].[geolocation_lon]
FROM
	[dbo].[Appeals] [Appeals]
	LEFT JOIN [dbo].[Questions] [Questions] ON [Appeals].Id = [Questions].appeal_id
	LEFT JOIN [dbo].[Assignments] [Assignments] ON [Questions].Id = [Assignments].question_id
	LEFT JOIN [dbo].[AssignmentStates] [AssignmentStates] ON [Assignments].assignment_state_id = [AssignmentStates].Id
	LEFT JOIN [dbo].[AssignmentResults] [AssignmentResults] ON [Assignments].AssignmentResultsId = [AssignmentResults].Id
	LEFT JOIN [dbo].[Objects] [Objects] ON [Questions].[object_id] = [Objects].Id
	LEFT JOIN [dbo].[QuestionTypes] [QuestionTypes] ON [Questions].question_type_id = [QuestionTypes].Id
	LEFT JOIN [dbo].[Applicants] [Applicants] ON [Appeals].applicant_id = [Applicants].Id
	LEFT JOIN [dbo].[Assignments] AS [MainAss] ON [Questions].last_assignment_for_execution_id = [MainAss].Id
	LEFT JOIN [dbo].[Organizations] AS [MainExec] ON [MainAss].executor_organization_id = [MainExec].Id
WHERE
	[Appeals].applicant_id = @ApplicantIn1551
	AND (
		/*START CRM1551-397*/
		(
			[Assignments].AssignmentResolutionsId = 3
			/*На перевірці*/
			AND [Assignments].AssignmentResultsId = 4
			/*Виконано*/
		)
		/*END CRM1551-397*/
		/*START CRM1551-395*/
		OR (
			(
				[Questions].[question_state_id] = 2
				/*В роботі*/
			)
			OR (
				[Questions].[question_state_id] = 4
				/*На доопрацюванні*/
			)
		)
		OR (
			[Questions].[question_state_id] = 3
			/*На перевірці*/
			AND [Assignments].AssignmentResolutionsId = 7
			/*Роз'яснено*/
			AND [Assignments].AssignmentResultsId = 8
			/*Неможливо виконати*/
		)
		/*END CRM1551-395*/
	)

UNION

SELECT
	[Appeals].Id AS [AppealId],
	[Appeals].[registration_date],
	[Appeals].[registration_number],
	[AssignmentStates].[name] AS AssignmentStates,
	[AssignmentResults].[name] AS Results,
	[Objects].[name] AS adress,
	[QuestionTypes].[name] AS QuestionTypes,
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
	[Questions].[geolocation_lon]
FROM
	[dbo].[Appeals] [Appeals]
	LEFT JOIN [dbo].[Questions] [Questions] ON [Appeals].Id = [Questions].appeal_id
	LEFT JOIN [dbo].[Assignments] [Assignments] ON [Questions].Id = [Assignments].question_id
	LEFT JOIN [dbo].[AssignmentStates] [AssignmentStates] ON [Assignments].assignment_state_id = [AssignmentStates].Id
	LEFT JOIN [dbo].[AssignmentResults] [AssignmentResults] ON [Assignments].AssignmentResultsId = [AssignmentResults].Id
	LEFT JOIN [dbo].[Objects] [Objects] ON [Questions].[object_id] = [Objects].Id
	LEFT JOIN [dbo].[QuestionTypes] [QuestionTypes] ON [Questions].question_type_id = [QuestionTypes].Id
	LEFT JOIN [dbo].[Applicants] [Applicants] ON [Appeals].applicant_id = [Applicants].Id
	LEFT JOIN [dbo].[Assignments] AS [MainAss] ON [Questions].last_assignment_for_execution_id = [MainAss].Id
	LEFT JOIN [dbo].[Organizations] AS [MainExec] ON [MainAss].executor_organization_id = [MainExec].Id
WHERE
	[Appeals].applicant_id IN (
		SELECT
			Id
		FROM
			@ApplicantForPhone
	)
	AND (
		/*START CRM1551-397*/
		(
			[Assignments].AssignmentResolutionsId = 3
			/*На перевірці*/
			AND [Assignments].AssignmentResultsId = 4
			/*Виконано*/
		)
		/*END CRM1551-397*/
		/*START CRM1551-395*/
		OR (
			(
				[Questions].[question_state_id] = 2
				/*В роботі*/
			)
			OR (
				[Questions].[question_state_id] = 4
				/*На доопрацюванні*/
			)
		)
		OR (
			[Questions].[question_state_id] = 3
			/*На перевірці*/
			AND [Assignments].AssignmentResolutionsId = 7
			/*Роз'яснено*/
			AND [Assignments].AssignmentResultsId = 8
			/*Неможливо виконати*/
		)
		/*END CRM1551-395*/
	)
ORDER BY 1
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;