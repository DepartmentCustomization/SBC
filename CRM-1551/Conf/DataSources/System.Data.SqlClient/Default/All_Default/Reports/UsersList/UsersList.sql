DECLARE @UserTab TABLE ([Id] NVARCHAR(128), 
				[Operator] NVARCHAR(MAX), 
				[sort_index] TINYINT);

INSERT INTO @UserTab
SELECT
      u.UserId AS Id,
      u.LastName + isnull(' ' + u.FirstName, N'') + isnull(' ' + u.Patronymic, N'') AS Operator,
	  1 AS sort_index
FROM
      [#system_database_name#].[dbo].[User] u
	--   CRM_1551_System.dbo.[User] u
       ;

INSERT INTO @UserTab
SELECT 
	'0' AS Id,
	N'Усі' AS Operator,
	0 AS sort_index;

SELECT 
	[Id],
	[Operator]
FROM @UserTab
WHERE
     #filter_columns#
     ORDER BY [sort_index],
              [Operator]
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;