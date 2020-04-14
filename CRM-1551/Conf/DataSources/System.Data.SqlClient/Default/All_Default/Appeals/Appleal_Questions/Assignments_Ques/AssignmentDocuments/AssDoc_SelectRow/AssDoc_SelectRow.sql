-- DECLARE @Id INT = 2196;

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
DECLARE @LocalArchive NVARCHAR(20) = N'DB.UKRODS.CF';

DECLARE @IsHere BIT = IIF(
   (
      SELECT
         COUNT(1)
      FROM
         [dbo].[AssignmentConsDocuments]
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
  dt.id AS doc_type_id,
  dt.name AS doc_type_name,
  [AssignmentConsDocuments].[add_date],
  [AssignmentConsDocuments].[name],
  [AssignmentConsDocuments].content
FROM
  [dbo].[AssignmentConsDocuments]
  LEFT JOIN [dbo].DocumentTypes dt ON dt.Id = [AssignmentConsDocuments].doc_type_id
WHERE 
  [AssignmentConsDocuments].[Id] = @Id ;
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
  dt.id AS doc_type_id,
  dt.name AS doc_type_name,
  [AssignmentConsDocuments].[add_date],
  [AssignmentConsDocuments].[name],
  [AssignmentConsDocuments].content
FROM
  [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[AssignmentConsDocuments]
  LEFT JOIN [dbo].DocumentTypes dt ON dt.Id = [AssignmentConsDocuments].doc_type_id
WHERE 
  [AssignmentConsDocuments].[Id] = @Id ; ' ; 

	EXEC sp_executesql @Query, N'@Id INT', 
								@Id = @Id;
END

ELSE IF(@ProdArchiveServerID IS NOT NULL)
AND (@LocalArchiveServerID IS NULL)
BEGIN 
SET @Query = 
N'SELECT
  [AssignmentConsDocuments].[Id],
  dt.id AS doc_type_id,
  dt.name AS doc_type_name,
  [AssignmentConsDocuments].[add_date],
  [AssignmentConsDocuments].[name],
  [AssignmentConsDocuments].content
FROM
  [10.192.200.182].[CRM_1551_Analitics].[dbo].[AssignmentConsDocuments]
  LEFT JOIN [dbo].DocumentTypes dt ON dt.Id = [AssignmentConsDocuments].doc_type_id
WHERE 
  [AssignmentConsDocuments].[Id] = @Id ; ' ;

	EXEC sp_executesql @Query, N'@Id INT', 
								@Id = @Id;
END
END