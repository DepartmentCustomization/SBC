--DECLARE @Id INT = 1400166 ; 

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
DECLARE @IsHere BIT = IIF(
   (
      SELECT
         COUNT(1)
      FROM
         dbo.Questions
      WHERE
        appeal_id = @Id
   ) = 0,
   0,
   1
);

IF(@IsHere = 1)
BEGIN
SELECT
  [Questions].[Id],
  [Questions].[registration_number],
  [Questions].[registration_date],
  QuestionStates.[name] AS question_state_name,
  [Questions].[control_date],
  QuestionTypes.[name] AS question_type_name,
  [Questions].[question_content]
FROM
  [dbo].[Questions] [Questions]
  LEFT JOIN [dbo].[Appeals] [Appeals] ON Appeals.Id = Questions.appeal_id
  LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON QuestionStates.Id = Questions.question_state_id
  LEFT JOIN [dbo].[QuestionTypes] [QuestionTypes] ON QuestionTypes.Id = Questions.question_type_id
WHERE
  Questions.appeal_id = @Id
 AND #filter_columns#
ORDER BY
  registration_date DESC 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;
END 

ELSE IF(@IsHere = 0)
BEGIN
---> Check is connection to Archive db exists
DECLARE @ServerID SMALLINT = (SELECT server_id FROM sys.servers WHERE [name] = @Archive);

IF(@ServerID IS NULL)
BEGIN
	RETURN;
END

ELSE 
BEGIN 
DECLARE @Query NVARCHAR(MAX) = 
N'SELECT
  [Questions].[Id],
  [Questions].[registration_number],
  [Questions].[registration_date],
  QuestionStates.[name] AS question_state_name,
  [Questions].[control_date],
  QuestionTypes.[name] AS question_type_name,
  [Questions].[question_content]
FROM
  [10.192.200.182].[CRM_1551_Analitics].[dbo].[Questions] [Questions]
  LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].[dbo].[Appeals] [Appeals] ON Appeals.Id = Questions.appeal_id
  LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON QuestionStates.Id = Questions.question_state_id
  LEFT JOIN [dbo].[QuestionTypes] [QuestionTypes] ON QuestionTypes.Id = Questions.question_type_id
WHERE
  Questions.appeal_id = @Id
 AND #filter_columns#
ORDER BY
  registration_date DESC 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ; ' ;

EXEC sp_executesql @Query, N'@Id INT ', 
							@Id = @Id ;
END
END