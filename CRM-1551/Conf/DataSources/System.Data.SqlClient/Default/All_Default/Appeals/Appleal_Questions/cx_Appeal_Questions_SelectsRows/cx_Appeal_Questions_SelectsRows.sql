-- DECLARE @Id INT = 5392191 ; 

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
DECLARE @LocalArchive NVARCHAR(20) = N'DB.UKRODS.CF';

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
  [Questions].[registration_number],
  [Questions].[registration_date],
  QuestionStates.[name] AS question_state_name,
  [Questions].[control_date],
  QuestionTypes.[name] AS question_type_name,
  [Questions].[question_content]
FROM
  [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[Questions] [Questions]
  LEFT JOIN [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[Appeals] [Appeals] ON Appeals.Id = Questions.appeal_id
  LEFT JOIN [dbo].[QuestionStates] [QuestionStates] ON QuestionStates.Id = Questions.question_state_id
  LEFT JOIN [dbo].[QuestionTypes] [QuestionTypes] ON QuestionTypes.Id = Questions.question_type_id
WHERE
  Questions.appeal_id = @Id
 AND #filter_columns#
ORDER BY
  registration_date DESC 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ; ' ;

EXEC sp_executesql @Query, N'@Id INT, @pageOffsetRows INT, @pageLimitRows INT', 
							                @Id = @Id,
                              @pageOffsetRows = @pageOffsetRows,
                              @pageLimitRows = @pageLimitRows;
END

ELSE IF(@ProdArchiveServerID IS NOT NULL)
AND (@LocalArchiveServerID IS NULL)
BEGIN 
SET @Query = 
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

EXEC sp_executesql @Query, N'@Id INT, @pageOffsetRows INT, @pageLimitRows INT', 
							                @Id = @Id,
                              @pageOffsetRows = @pageOffsetRows,
                              @pageLimitRows = @pageLimitRows;
END
END