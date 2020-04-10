--  DECLARE @AppealRegistrationNumber NVARCHAR(20) = N'0-301';

IF(@AppealRegistrationNumber IS NULL)
BEGIN
	RETURN;
END

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
DECLARE @LocalArchive NVARCHAR(20) = N'DB.UKRODS.CF';

IF object_id('tempdb..##QuestionData') IS NOT NULL
BEGIN
DROP TABLE ##QuestionData;
END

SELECT
  [Questions].[Id],
  [Questions].[registration_number] AS [Номер питання],
  [QuestionStates].[name] AS [Стан питання],
  [QuestionTypes].[name] AS [Тип питання],
  [Organizations].[name] AS [Виконавець],
  [Questions].registration_date AS [Дата та час реєстрації питання],
  [Questions].control_date AS [Дата контролю]
  
  INTO ##QuestionData

FROM
  [dbo].[Questions] Questions 
  LEFT JOIN [dbo].[QuestionTypes] QuestionTypes ON [QuestionTypes].Id = [Questions].question_type_id
  LEFT JOIN [dbo].[Objects] Objects ON [Objects].Id = [Questions].[object_id]
  LEFT JOIN [dbo].[Buildings] Buildings ON [Buildings].Id = [Objects].[builbing_id]
  LEFT JOIN [dbo].[Streets] Streets ON [Streets].Id = [Buildings].street_id
  LEFT JOIN [dbo].[StreetTypes] StreetTypes ON [StreetTypes].Id = [Streets].street_type_id
  LEFT JOIN [dbo].[Districts] Districts ON [Districts].Id = [Streets].district_id
  LEFT JOIN [dbo].[QuestionStates] QuestionStates ON [QuestionStates].Id = [Questions].question_state_id
  LEFT JOIN [dbo].[Assignments] Assignments ON [Assignments].Id = [Questions].last_assignment_for_execution_id
  LEFT JOIN [dbo].[AssignmentResults] AssignmentResults ON [AssignmentResults].Id = [Assignments].AssignmentResultsId
  LEFT JOIN [dbo].[Organizations] Organizations ON [Organizations].Id = [Assignments].executor_organization_id
  LEFT JOIN [dbo].[Appeals] Appeals ON [Appeals].Id = [Questions].appeal_id 
WHERE
  [Appeals].[registration_number] = @AppealRegistrationNumber 
  ;

IF(SELECT COUNT(1) FROM ##QuestionData) > 0
BEGIN
SELECT 
	[Id],
    [Номер питання],
    [Стан питання],
    [Тип питання],
    [Виконавець],
    [Дата та час реєстрації питання],
    [Дата контролю]
FROM ##QuestionData ;
END

ELSE 
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
     [Questions].[Id],
     [Questions].[registration_number] AS [Номер питання],
     [QuestionStates].[name] AS [Стан питання],
     [QuestionTypes].[name] AS [Тип питання],
     [Organizations].[name] AS [Виконавець],
     [Questions].registration_date AS [Дата та час реєстрації питання],
     [Questions].control_date AS [Дата контролю]
  FROM
   [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[Questions] Questions 
   LEFT JOIN [dbo].[QuestionTypes] QuestionTypes ON [QuestionTypes].Id = [Questions].question_type_id
   LEFT JOIN [dbo].[Objects] Objects ON [Objects].Id = [Questions].[object_id]
   LEFT JOIN [dbo].[Buildings] Buildings ON [Buildings].Id = [Objects].[builbing_id]
   LEFT JOIN [dbo].[Streets] Streets ON [Streets].Id = [Buildings].street_id
   LEFT JOIN [dbo].[StreetTypes] StreetTypes ON [StreetTypes].Id = [Streets].street_type_id
   LEFT JOIN [dbo].[Districts] Districts ON [Districts].Id = [Streets].district_id
   LEFT JOIN [dbo].[QuestionStates] QuestionStates ON [QuestionStates].Id = [Questions].question_state_id
   LEFT JOIN [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[Assignments] Assignments ON [Assignments].Id = [Questions].last_assignment_for_execution_id
   LEFT JOIN [dbo].[AssignmentResults] AssignmentResults ON [AssignmentResults].Id = [Assignments].AssignmentResultsId
   LEFT JOIN [dbo].[Organizations] Organizations ON [Organizations].Id = [Assignments].executor_organization_id
   LEFT JOIN [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[Appeals] Appeals ON [Appeals].Id = [Questions].appeal_id 
  WHERE
   [Appeals].[registration_number] = @AppealRegistrationNumber  ; ' ;

   EXEC sp_executesql @Query, N'@AppealRegistrationNumber NVARCHAR(20)', 
							  @AppealRegistrationNumber = AppealRegistrationNumber;
END

ELSE IF(@ProdArchiveServerID IS NOT NULL)
AND (@LocalArchiveServerID IS NULL)
BEGIN
SET @Query =
N'SELECT
     [Questions].[Id],
     [Questions].[registration_number] AS [Номер питання],
     [QuestionStates].[name] AS [Стан питання],
     [QuestionTypes].[name] AS [Тип питання],
     [Organizations].[name] AS [Виконавець],
     [Questions].registration_date AS [Дата та час реєстрації питання],
     [Questions].control_date AS [Дата контролю]
  FROM
   [10.192.200.182].[CRM_1551_Analitics].[dbo].[Questions] Questions 
   LEFT JOIN [dbo].[QuestionTypes] QuestionTypes ON [QuestionTypes].Id = [Questions].question_type_id
   LEFT JOIN [dbo].[Objects] Objects ON [Objects].Id = [Questions].[object_id]
   LEFT JOIN [dbo].[Buildings] Buildings ON [Buildings].Id = [Objects].[builbing_id]
   LEFT JOIN [dbo].[Streets] Streets ON [Streets].Id = [Buildings].street_id
   LEFT JOIN [dbo].[StreetTypes] StreetTypes ON [StreetTypes].Id = [Streets].street_type_id
   LEFT JOIN [dbo].[Districts] Districts ON [Districts].Id = [Streets].district_id
   LEFT JOIN [dbo].[QuestionStates] QuestionStates ON [QuestionStates].Id = [Questions].question_state_id
   LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[Assignments] Assignments ON [Assignments].Id = [Questions].last_assignment_for_execution_id
   LEFT JOIN [dbo].[AssignmentResults] AssignmentResults ON [AssignmentResults].Id = [Assignments].AssignmentResultsId
   LEFT JOIN [dbo].[Organizations] Organizations ON [Organizations].Id = [Assignments].executor_organization_id
   LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[Appeals] Appeals ON [Appeals].Id = [Questions].appeal_id 
  WHERE
   [Appeals].[registration_number] = @AppealRegistrationNumber  ; ' ;

   EXEC sp_executesql @Query, N'@AppealRegistrationNumber NVARCHAR(20)', 
							  @AppealRegistrationNumber = AppealRegistrationNumber;
END
END