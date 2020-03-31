--DECLARE @ApplicantsId INT = 1692744;

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
DECLARE @ServerID SMALLINT = (SELECT server_id FROM sys.servers WHERE [name] = @Archive);

IF(@ServerID IS NULL)
BEGIN
	RETURN;
END

ELSE 
BEGIN 
DECLARE @Query NVARCHAR(MAX) = 
N'SELECT
  [Questions].Id,
  Questions.registration_number,
  [Questions].[registration_date],
  [QuestionStates].name AS QuestionStates,
  [QuestionTypes].name AS QuestionType,
  [Questions].control_date,
  Organizations.short_name
FROM
  [10.192.200.182].[CRM_1551_Analitics].[dbo].[Questions]
  LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[Appeals] ON [Questions].appeal_id = [Appeals].Id
  LEFT JOIN [dbo].[Applicants] ON [Applicants].Id = [Appeals].applicant_id
  LEFT JOIN [dbo].[QuestionStates] ON [Questions].question_state_id = [QuestionStates].Id
  LEFT JOIN [dbo].[QuestionTypes] ON [Questions].question_type_id = [QuestionTypes].Id
  LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[Assignments] ON Assignments.Id = Questions.last_assignment_for_execution_id
  LEFT JOIN Organizations ON Organizations.Id = Assignments.executor_organization_id
WHERE
  [Applicants].Id = @ApplicantsId
  AND #filter_columns#
ORDER BY
  [Questions].[registration_date] 
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY ; ' ;

 EXEC sp_executesql @Query, N'@ApplicantsId INT', 
							 @ApplicantsId = @ApplicantsId;
 END