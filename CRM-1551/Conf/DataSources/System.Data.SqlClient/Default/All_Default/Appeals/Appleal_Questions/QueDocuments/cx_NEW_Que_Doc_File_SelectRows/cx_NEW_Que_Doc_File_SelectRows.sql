-- DECLARE @Id INT = 6690742;

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
DECLARE @LocalArchive NVARCHAR(20) = N'DB.UKRODS.CF';

DECLARE @IsHere BIT = IIF(
   (
      SELECT
		COUNT(1)
      FROM
         dbo.QuestionDocFiles
      WHERE
        question_id = @Id
   ) = 0,
   0,
   1
);

IF(@IsHere = 1)
BEGIN
SELECT
  Id,
  create_date,
  [name] AS [Name],
  [File]
FROM
  [dbo].[QuestionDocFiles]
WHERE
  question_id = @Id
  AND [File] IS NOT NULL
  AND #filter_columns#
ORDER BY 1 
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY ;
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
N'DECLARE @ArchivePath NVARCHAR(500);
IF(SELECT IsArchive FROM dbo.QuestionDocFiles WHERE question_id = @Id) IS NOT NULL
BEGIN
SET @ArchivePath = (SELECT TOP 1 PathToArchive FROM [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].QuestionDocFiles WHERE question_id = @Id);
END

IF OBJECT_ID(''tempdb..#QuestionFilesData'') IS NOT NULL 
BEGIN
DROP TABLE #QuestionFilesData ;
END
CREATE TABLE #QuestionFilesData (
			[Id] INT,
			[create_date] DATETIME,
			[Name] NVARCHAR(250),
			[File] VARBINARY(MAX)
			);
INSERT INTO #QuestionFilesData (
			[Id],
			[create_date],
			[Name],
			[File] )

SELECT
  Id,
  create_date,
  [name],
  [File]
FROM
  [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[QuestionDocFiles]
WHERE
  question_id = @Id
  AND [File] IS NOT NULL
  AND IsArchive <> 1

 UNION 
 ALL 

SELECT
  Id,
  create_date,
  [name],
  [File]
FROM
  [@ArchivePath].[dbo].[QuestionDocFiles]
WHERE
  question_id = @Id
  AND [File] IS NOT NULL
  ;
SELECT 
	[Id],
	[create_date],
	[Name],
	[File]
FROM #QuestionFilesData 
WHERE #filter_columns#
ORDER BY 1 
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY
;' ;

EXEC sp_executesql @Query, N'@Id INT, @pageOffsetRows INT, @pageLimitRows INT', 
							  @Id = @Id,
                              @pageOffsetRows = @pageOffsetRows,
                              @pageLimitRows = @pageLimitRows;
END

ELSE IF(@ProdArchiveServerID IS NOT NULL)
AND (@LocalArchiveServerID IS NULL)
BEGIN 
SET @Query = 
N'DECLARE @ArchivePath NVARCHAR(500);
IF(SELECT IsArchive FROM dbo.QuestionDocFiles WHERE question_id = @Id) IS NOT NULL
BEGIN
SET @ArchivePath = (SELECT TOP 1 PathToArchive FROM [10.192.200.182].[CRM_1551_Analitics].[dbo].QuestionDocFiles WHERE question_id = @Id);
END

IF OBJECT_ID(''tempdb..#QuestionFilesData'') IS NOT NULL 
BEGIN
DROP TABLE #QuestionFilesData ;
END
CREATE TABLE #QuestionFilesData (
			[Id] INT,
			[create_date] DATETIME,
			[Name] NVARCHAR(250),
			[File] VARBINARY(MAX)
			);
INSERT INTO #QuestionFilesData (
			[Id],
			[create_date],
			[Name],
			[File] )

SELECT
  Id,
  create_date,
  [name],
  [File]
FROM
  [10.192.200.182].[CRM_1551_Analitics].[dbo].[QuestionDocFiles]
WHERE
  question_id = @Id
  AND [File] IS NOT NULL

 UNION 
 ALL 

SELECT
  Id,
  create_date,
  [name],
  [File]
FROM
  [@ArchivePath].[dbo].[QuestionDocFiles]
WHERE
  question_id = @Id
  AND [File] IS NOT NULL
  ;
SELECT 
	[Id],
	[create_date],
	[Name],
	[File]
FROM #QuestionFilesData 
WHERE #filter_columns#
ORDER BY 1 
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY
;' ;

EXEC sp_executesql @Query, N'@Id INT, @pageOffsetRows INT, @pageLimitRows INT', 
							  @Id = @Id,
                              @pageOffsetRows = @pageOffsetRows,
                              @pageLimitRows = @pageLimitRows;
END
END