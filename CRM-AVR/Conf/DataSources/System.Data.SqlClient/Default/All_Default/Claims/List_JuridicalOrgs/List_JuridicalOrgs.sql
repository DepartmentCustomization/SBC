IF object_Id('tempdb..#TreeOrg') IS NOT NULL BEGIN DROP TABLE #TreeOrg ;
END ---> Посадил дерево :3
CREATE TABLE #TreeOrg (
[Id] INT NOT NULL PRIMARY KEY,
[Parent_Organization_ID] INT,
[Name] NVARCHAR(500)
) WITH (DATA_COMPRESSION = PAGE);

INSERT INTO
	#TreeOrg 
SELECT
	[Id],
	[Parent_Organization_ID],
	[Name]
FROM
	dbo.Organizations
WHERE
	Is_WC = 2
UNION
ALL
SELECT
	1,
	NULL,
	N'Юридична структура';

UPDATE
	#TreeOrg
SET
	Parent_Organization_ID = 1
WHERE
	Parent_Organization_ID IS NULL
	AND Id <> 1;

WITH [ParentOrganisations] AS (
	SELECT
		[Id],
		[Name],
		Parent_Organization_ID
	FROM
		#TreeOrg
	WHERE
		#filter_columns#
),
[Organisations] AS (
	SELECT
		[Id],
		[Name],
		Parent_Organization_ID
	FROM
		[ParentOrganisations]
	UNION
	ALL
	SELECT
		[Id],
		[Name],
		Parent_Organization_ID
	FROM
		#TreeOrg
	WHERE
		EXISTS(
			SELECT
				*
			FROM
				[ParentOrganisations]
			WHERE
				[ParentOrganisations].[Id] = #TreeOrg.Parent_Organization_ID)
		)
	SELECT
		[Id],
		[Name],
		Parent_Organization_ID
	FROM
		[Organisations]
	WHERE #filter_columns# 
	;