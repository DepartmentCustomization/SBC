--   DECLARE @Id INT = 2967587;
--   DECLARE @question INT = (SELECT question_id FROM dbo.Assignments WHERE Id = @Id);

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
    [Assignments].[Id],
    [Assignments].[registration_date],
    [at].name AS ass_type_name,
    Organizations.short_name AS performer,
    [Assignments].[main_executor],
    ast.name AS ass_state_name,
    Assignments.execution_date,
    Assignments.question_id
FROM
    [dbo].[Assignments] [Assignments] 
    LEFT JOIN [dbo].[AssignmentTypes] [at] ON [at].Id = Assignments.assignment_type_id
    LEFT JOIN [dbo].[AssignmentStates] [ast] ON [ast].Id = Assignments.assignment_state_id
    LEFT JOIN [dbo].[Organizations] [Organizations] ON Organizations.Id = Assignments.executor_organization_id
WHERE
    Assignments.question_id = @question
    AND [Assignments].[Id] <> @Id
 --   AND #filter_columns#
ORDER BY
    main_executor DESC,
    ass_state_name 
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
    [Assignments].[Id],
    [Assignments].[registration_date],
    at.name AS ass_type_name,
    Organizations.short_name AS performer,
    [Assignments].[main_executor],
    ast.name AS ass_state_name,
    Assignments.execution_date,
    Assignments.question_id
FROM
    [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[Assignments] [Assignments] 
    LEFT JOIN [dbo].[AssignmentTypes] [at] ON [at].Id = Assignments.assignment_type_id
    LEFT JOIN [dbo].[AssignmentStates] [ast] ON [ast].Id = Assignments.assignment_state_id
    LEFT JOIN [dbo].[Organizations] [Organizations] ON Organizations.Id = Assignments.executor_organization_id
WHERE
    Assignments.question_id = @question
    AND [Assignments].[Id] <> @Id
    AND #filter_columns#
ORDER BY
    main_executor DESC,
    ass_state_name 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY 
; ' ;

 EXEC sp_executesql @Query, N'@question INT, @Id INT, @pageOffsetRows INT, @pageLimitRows INT  ', 
							@question = @question,
							@Id = @Id,
                            @pageOffsetRows = @pageOffsetRows,
                            @pageLimitRows = @pageLimitRows;
END

ELSE IF(@ProdArchiveServerID IS NOT NULL)
AND (@LocalArchiveServerID IS NULL)
BEGIN 
SET @Query = 
N'SELECT
    [Assignments].[Id],
    [Assignments].[registration_date],
    at.name AS ass_type_name,
    Organizations.short_name AS performer,
    [Assignments].[main_executor],
    ast.name AS ass_state_name,
    Assignments.execution_date,
    Assignments.question_id
FROM
    [10.192.200.182].[CRM_1551_Analitics].[dbo].[Assignments] [Assignments] 
    LEFT JOIN [dbo].[AssignmentTypes] [at] ON [at].Id = Assignments.assignment_type_id
    LEFT JOIN [dbo].[AssignmentStates] [ast] ON [ast].Id = Assignments.assignment_state_id
    LEFT JOIN [dbo].[Organizations] [Organizations] ON Organizations.Id = Assignments.executor_organization_id
WHERE
    Assignments.question_id = @question
    AND [Assignments].[Id] <> @Id
    AND #filter_columns#
ORDER BY
    main_executor DESC,
    ass_state_name 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ; ' ;

 EXEC sp_executesql @Query, N'@question INT, @Id INT, @pageOffsetRows INT, @pageLimitRows INT  ', 
							@question = @question,
							@Id = @Id,
                            @pageOffsetRows = @pageOffsetRows,
                            @pageLimitRows = @pageLimitRows;
END
END