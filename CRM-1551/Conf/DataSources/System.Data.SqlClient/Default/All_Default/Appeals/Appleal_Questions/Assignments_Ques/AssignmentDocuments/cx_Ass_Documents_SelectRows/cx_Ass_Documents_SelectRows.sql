-- DECLARE @Id INT = 1810750;

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
DECLARE @LocalArchive NVARCHAR(20) = N'DB.UKRODS.CF';

DECLARE @IsHere BIT = IIF(
   (
      SELECT
         COUNT(1)
      FROM
         dbo.Assignments 
      WHERE
        Id = @Id
   ) = 0,
   0,
   1
);

IF(@IsHere = 1)
BEGIN
SELECT
  [AssignmentConsDocuments].[Id],
  dt.name AS doc_type_id,
  [AssignmentConsDocuments].[add_date],
  [AssignmentConsDocuments].[name]
FROM
  [dbo].[AssignmentConsDocuments]
  LEFT JOIN DocumentTypes dt ON dt.Id = [AssignmentConsDocuments].doc_type_id
WHERE
  [AssignmentConsDocuments].[assignment_сons_id] IN (
    SELECT
      Id
    FROM
      [AssignmentConsiderations]
    WHERE
      [assignment_id] = @Id
  )
  AND #filter_columns#
      #sort_columns#
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
  [AssignmentConsDocuments].[Id],
  dt.name AS doc_type_id,
  [AssignmentConsDocuments].[add_date],
  [AssignmentConsDocuments].[name]
FROM
  [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[AssignmentConsDocuments]
  LEFT JOIN DocumentTypes dt ON dt.Id = [AssignmentConsDocuments].doc_type_id
WHERE
  [AssignmentConsDocuments].[assignment_сons_id] IN (
    SELECT
      Id
    FROM
      [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[AssignmentConsiderations]
    WHERE
      [assignment_id] = @Id
  )
  AND #filter_columns#
      #sort_columns#
  OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ; ';

	EXEC sp_executesql @Query, N'@Id INT, @pageOffsetRows INT, @pageLimitRows INT ', 
							@Id = @Id,
							@pageOffsetRows = @pageOffsetRows,
                            @pageLimitRows = @pageLimitRows;
END

ELSE IF(@ProdArchiveServerID IS NOT NULL)
AND (@LocalArchiveServerID IS NULL)
BEGIN 
SET @Query = 
N'SELECT
  [AssignmentConsDocuments].[Id],
  dt.name AS doc_type_id,
  [AssignmentConsDocuments].[add_date],
  [AssignmentConsDocuments].[name]
FROM
  [10.192.200.182].[CRM_1551_Analitics].[dbo].[AssignmentConsDocuments]
  LEFT JOIN DocumentTypes dt ON dt.Id = [AssignmentConsDocuments].doc_type_id
WHERE
  [AssignmentConsDocuments].[assignment_сons_id] IN (
    SELECT
      Id
    FROM
      [10.192.200.182].[CRM_1551_Analitics].[dbo].[AssignmentConsiderations]
    WHERE
      [assignment_id] = @Id
  )
  AND #filter_columns#
      #sort_columns#
  OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ; ';

	EXEC sp_executesql @Query, N'@Id INT, @pageOffsetRows INT, @pageLimitRows INT ', 
							@Id = @Id,
							@pageOffsetRows = @pageOffsetRows,
                            @pageLimitRows = @pageLimitRows;
END
END