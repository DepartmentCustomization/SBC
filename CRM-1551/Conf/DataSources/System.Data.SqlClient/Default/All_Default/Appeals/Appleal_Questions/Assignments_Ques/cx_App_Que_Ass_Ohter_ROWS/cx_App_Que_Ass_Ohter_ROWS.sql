--  DECLARE @Id INT = 3735037;
--  DECLARE @question INT = (SELECT question_id FROM dbo.Assignments WHERE Id = @Id);

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
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
    at.name AS ass_type_name,
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
    AND #filter_columns#
ORDER BY
    main_executor DESC,
    ass_state_name 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;
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

 EXEC sp_executesql @Query, N'@question INT, @Id INT ', 
							@question = @question,
							@Id = @Id ;
END
END