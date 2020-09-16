--  DECLARE @Id INT = 12349; 
--  DECLARE @pageOffsetRows BIGINT = 0;
--  DECLARE @pageLimitRows BIGINT = 15;

DECLARE @Archive NVARCHAR(400) = '['+(SELECT TOP 1 [IP]+'].['+[DatabaseName]+'].' FROM [dbo].[SetingConnetDatabase] WHERE Code = N'Archive');

DECLARE @Query NVARCHAR(MAX) = N'
IF OBJECT_ID(''tempdb..#PurposeQuestions'') IS NOT NULL
BEGIN
	DROP TABLE #PurposeQuestions;
END

CREATE TABLE #PurposeQuestions (Id INT, 
							    question_number NVARCHAR(20),
							    question_reg_date DATETIME,
							    question_types_name NVARCHAR(500),
								question_objects_name NVARCHAR(MAX),
								performer_name NVARCHAR(500)
								) WITH (DATA_COMPRESSION = PAGE);
INSERT INTO #PurposeQuestions
SELECT Questions.[Id]
	  , Questions.registration_number AS question_number
      , Questions.[registration_date] AS question_reg_date
	  , QuestionTypes.name AS question_types_name
	  , [Objects].name AS question_objects_name
	  , Organizations.short_name AS performer_name
FROM [dbo].[Events] AS e
	LEFT JOIN [dbo].[EventQuestionsTypes] eqt ON e.Id=eqt.[event_id]
	LEFT JOIN [dbo].[EventObjects] ON EventObjects.event_id = e.Id
	INNER JOIN [dbo].[Questions] ON Questions.question_type_id = eqt.question_type_id
		AND Questions.[object_id] = EventObjects.[object_id]
		AND Questions.event_id IS NULL
	LEFT JOIN [dbo].[Assignments] ON Assignments.Id = Questions.last_assignment_for_execution_id
	LEFT JOIN [dbo].[Organizations] ON Organizations.Id = Assignments.executor_organization_id
	LEFT JOIN [dbo].[QuestionTypes] ON QuestionTypes.Id = Questions.question_type_id
	LEFT JOIN [dbo].[Objects] ON [Objects].Id = Questions.[object_id]
	WHERE e.Id = @Id; 

DECLARE @temp_CopyData BIT;

SELECT 
	@temp_CopyData = IIF(COUNT(1) = 0, 0, 1)
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = ''dbo''
AND TABLE_NAME = ''QuestionsFromCopeWithoutEvent_temp''

IF (@temp_CopyData = 1)
BEGIN
INSERT INTO #PurposeQuestions
SELECT copy_data.[question_id]
	  , copy_data.[registration_number] AS question_number
      , copy_data.[registration_date] AS question_reg_date
	  , QuestionTypes.name AS question_types_name
	  , [Objects].name AS question_objects_name
	  , Organizations.short_name AS performer_name
FROM [dbo].[Events] AS e WITH (NOLOCK)
	LEFT JOIN [dbo].[EventQuestionsTypes] eqt ON e.Id=eqt.[event_id]
	LEFT JOIN [dbo].[EventObjects] WITH (NOLOCK) ON EventObjects.event_id = e.Id
	INNER JOIN [dbo].[QuestionsFromCopeWithoutEvent_temp] copy_data ON copy_data.question_type_id = eqt.question_type_id
		AND copy_data.[object_id] = EventObjects.[object_id]
		AND copy_data.event_id IS NULL
	LEFT JOIN [dbo].[Organizations] ON Organizations.Id = copy_data.executor_organization_id
	LEFT JOIN [dbo].[QuestionTypes] ON QuestionTypes.Id = copy_data.question_type_id
	LEFT JOIN [dbo].[Objects] WITH (NOLOCK) ON [Objects].Id = copy_data.[object_id]
	WHERE e.Id = @Id; 
END

SELECT 
DISTINCT
	Id, 
	question_number,
	question_reg_date,
	question_types_name,
	question_objects_name,
	performer_name
FROM #PurposeQuestions
ORDER BY 1
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY
; ' ;

 EXEC sp_executesql @Query, N'@Id INT, @pageOffsetRows BIGINT, @pageLimitRows BIGINT', 
							 @Id = @Id,
							 @pageOffsetRows = @pageOffsetRows,
							 @pageLimitRows = @pageLimitRows;