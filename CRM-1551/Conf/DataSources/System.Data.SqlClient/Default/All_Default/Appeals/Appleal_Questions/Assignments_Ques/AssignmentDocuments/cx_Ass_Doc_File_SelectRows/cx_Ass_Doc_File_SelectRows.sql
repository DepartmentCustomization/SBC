-- DECLARE @Id INT = 2196;

DECLARE @Archive NVARCHAR(20) = N'10.192.200.182';
DECLARE @LocalArchive NVARCHAR(20) = N'DB.UKRODS.CF';

DECLARE @IsHere BIT = IIF(
   (
      SELECT
         COUNT(1)
      FROM
         dbo.AssignmentConsDocuments
      WHERE
        Id = @Id
   ) = 0,
   0,
   1
);

IF(@IsHere = 1)
BEGIN
SELECT
  [Id],
  [assignment_cons_doc_id],
  [link],
  [create_date],
  [user_id],
  [edit_date],
  [user_edit_id],
  [name],
  [File]
FROM
  [dbo].[AssignmentConsDocFiles]
WHERE
  [assignment_cons_doc_id] = @Id
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
N'SELECT
  [Id],
  [assignment_cons_doc_id],
  [link],
  [create_date],
  [user_id],
  [edit_date],
  [user_edit_id],
  [name],
  [File]
FROM
  [DB.UKRODS.CF].[CRM_1551_Analitics].[dbo].[AssignmentConsDocFiles]
WHERE
  [assignment_cons_doc_id] = @Id
 AND #filter_columns#
ORDER BY 1 
 OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY ;';

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
  [Id],
  [assignment_cons_doc_id],
  [link],
  [create_date],
  [user_id],
  [edit_date],
  [user_edit_id],
  [name],
  [File]
FROM
  [10.192.200.182].[CRM_1551_Analitics].[dbo].[AssignmentConsDocFiles]
WHERE
  [assignment_cons_doc_id] = @Id
  AND #filter_columns#
ORDER BY 1 
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY ; ';

	EXEC sp_executesql @Query, N'@Id INT, @pageOffsetRows INT, @pageLimitRows INT', 
								@Id = @Id,
								@pageOffsetRows = @pageOffsetRows,
								@pageLimitRows = @pageLimitRows;
END
END