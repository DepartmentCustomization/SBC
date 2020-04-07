--  DECLARE @question INT = 6691186;

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
DECLARE @LocalArchive NVARCHAR(20) = N'DB.UKRODS.CF';

DECLARE @IsHere BIT = IIF(
   (
      SELECT
         COUNT(1)
      FROM
         dbo.Assignments 
      WHERE
        question_id = @question
   ) = 0,
   0,
   1
);

IF(@IsHere = 1)
BEGIN
SELECT
  ass.[Id],
  ass.[registration_date],
  asst.name AS ass_type_name,
  IIF (
    len([head_name]) > 5,
    concat([head_name], ' ( ', [short_name], ')'),
    [short_name]
  ) AS performer,
  ass.[main_executor],
  ast.name AS ass_state_name,
  ass.execution_date,
  N'Перегляд' AS ed
FROM
  [dbo].[Assignments] ass
  LEFT JOIN dbo.AssignmentTypes asst ON asst.Id = ass.assignment_type_id
  LEFT JOIN dbo.AssignmentStates ast ON ast.Id = ass.assignment_state_id
  LEFT JOIN dbo.Organizations org ON org.Id = ass.executor_organization_id
  LEFT JOIN dbo.Questions q ON q.Id = ass.question_id
WHERE
  ass.question_id = @question
ORDER BY
  CASE
    WHEN ast.name <> N'Закрито' THEN 1
    WHEN ast.name = N'Закрито' THEN 2
  END,
  main_executor DESC 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;
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
  ass.[Id],
  ass.[registration_date],
  asst.name AS ass_type_name,
  IIF (
    len([head_name]) > 5,
    concat([head_name], '' ( '', [short_name], '')''),
    [short_name]
  ) AS performer,
  ass.[main_executor],
  ast.name AS ass_state_name,
  ass.execution_date,
  N''Перегляд'' AS ed
FROM
  [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[Assignments] ass
  LEFT JOIN dbo.AssignmentTypes asst ON asst.Id = ass.assignment_type_id
  LEFT JOIN dbo.AssignmentStates ast ON ast.Id = ass.assignment_state_id
  LEFT JOIN dbo.Organizations org ON org.Id = ass.executor_organization_id
  LEFT JOIN [DB.UKRODS.CF].[CRM_1551_Analitics].dbo.Questions q ON q.Id = ass.question_id
WHERE
  ass.question_id = @question
ORDER BY
  CASE
    WHEN ast.name <> N''Закрито'' THEN 1
    WHEN ast.name = N''Закрито'' THEN 2
  END,
  main_executor DESC 
 OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ; ' ;
 EXEC sp_executesql @Query, N'@question INT, @pageOffsetRows INT, @pageLimitRows INT ', 
							@question = @question,
              @pageOffsetRows = @pageOffsetRows,
              @pageLimitRows = @pageLimitRows;
END

ELSE IF(@ProdArchiveServerID IS NOT NULL)
AND (@LocalArchiveServerID IS NULL)
BEGIN 
SET @Query = 
N'SELECT
  ass.[Id],
  ass.[registration_date],
  asst.name AS ass_type_name,
  IIF (
    len([head_name]) > 5,
    concat([head_name], '' ( '', [short_name], '')''),
    [short_name]
  ) AS performer,
  ass.[main_executor],
  ast.name AS ass_state_name,
  ass.execution_date,
  N''Перегляд'' AS ed
FROM
  [10.192.200.182].[CRM_1551_Analitics].[dbo].[Assignments] ass
  LEFT JOIN dbo.AssignmentTypes asst ON asst.Id = ass.assignment_type_id
  LEFT JOIN dbo.AssignmentStates ast ON ast.Id = ass.assignment_state_id
  LEFT JOIN dbo.Organizations org ON org.Id = ass.executor_organization_id
  LEFT JOIN [10.192.200.182].[CRM_1551_Analitics].dbo.Questions q ON q.Id = ass.question_id
WHERE
  ass.question_id = @question
ORDER BY
  CASE
    WHEN ast.name <> N''Закрито'' THEN 1
    WHEN ast.name = N''Закрито'' THEN 2
  END,
  main_executor DESC 
 OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ; ' ;
 EXEC sp_executesql @Query, N'@question INT, @pageOffsetRows INT, @pageLimitRows INT', 
							@question = @question,
              @pageOffsetRows = @pageOffsetRows,
              @pageLimitRows = @pageLimitRows;
END
END