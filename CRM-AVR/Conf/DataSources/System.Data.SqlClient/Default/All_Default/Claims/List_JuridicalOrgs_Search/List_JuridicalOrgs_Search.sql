IF object_Id('tempdb..#TreeOrg') IS NOT NULL 
BEGIN
	DROP TABLE #TreeOrg ;
END
---> Посадил красивое дерево :3
CREATE TABLE #TreeOrg (
	[Id] INT NOT NULL PRIMARY KEY,
	[Parent_Organization_ID] INT,
	[Name] NVARCHAR(500)
	) WITH (DATA_COMPRESSION = PAGE);

INSERT INTO #TreeOrg 
SELECT 
	[Id],
	[Parent_Organization_ID],
	[Name]
FROM dbo.Organizations 
WHERE Is_WC = 2 
UNION ALL
SELECT 1, NULL, N'Юридична структура';

UPDATE #TreeOrg
SET Parent_Organization_ID = 1 
WHERE Parent_Organization_ID IS NULL
AND Id <> 1 ;


WITH [Root_Organizations] AS (
    SELECT
        [Id],
		[Name],
        [Parent_Organization_ID],
        CONVERT(NVARCHAR(max), [Name]) AS [Path]
    FROM
		#TreeOrg
    WHERE
	    Parent_Organization_ID IS NULL
    UNION
    ALL
    SELECT
        o.[Id],
        o.[Name],
        o.[Parent_Organization_ID],
        CONVERT(
            NVARCHAR(max),
            [Path] + N'/' + o.[Name]
        ) AS [Path]
    FROM
        #TreeOrg o
        JOIN [Root_Organizations] ro ON ro.[Id] = o.Parent_Organization_ID
)
SELECT
    [Id],
    [Name],
	[Parent_Organization_ID],
    [Path]
FROM
    [Root_Organizations]
WHERE
    #filter_columns#
    #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;