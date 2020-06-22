-- DECLARE @Id INT = 1058;

DECLARE @Archive NVARCHAR(400) = '[' +(
	SELECT
		TOP 1 [IP] + '].[' + [DatabaseName] + '].'
	FROM
		[dbo].[SetingConnetDatabase]
	WHERE
		Code = N'Archive'
);

DECLARE @IsHere BIT = IIF(
	(
		SELECT
			COUNT(1)
		FROM
			dbo.[QuestionDocFiles]
		WHERE
			Id = @Id
	) = 0,
	0,
	1
);

IF(@IsHere = 1) 
BEGIN
SET
	@Archive = SPACE(0);
END 
DECLARE @SqlText NVARCHAR(MAX);
IF (
	SELECT
		isnull(IsArchive, 0)
	FROM
		[dbo].[QuestionDocFiles]
	WHERE
		Id = @Id
) = 1 
BEGIN 
DECLARE @PathToArchive NVARCHAR(MAX) = (
	SELECT
		PathToArchive
	FROM
		[dbo].[QuestionDocFiles]
	WHERE
		Id = @Id
);

SET
	@SqlText = N'SELECT TOP 1 Id,
				     create_date,
				     [name] AS [Name],
				     [File]
				 FROM [' + @PathToArchive + '].[dbo].[QuestionDocFiles]
				 WHERE Id = ' + rtrim(@Id) + '
				' 
EXEC sp_executesql @SqlText;
END
ELSE 
BEGIN
SET
	@SqlText = N'SELECT
	Id,
	create_date,
	[name] AS [Name],
	[File]
FROM
	' + @Archive + N'[dbo].[QuestionDocFiles]
WHERE
	Id = @Id ';

EXEC sp_executesql @SqlText, N'@Id INT', @Id = @Id;
END