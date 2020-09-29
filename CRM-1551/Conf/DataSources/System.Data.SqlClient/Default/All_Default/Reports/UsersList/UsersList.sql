DECLARE @UserTab TABLE (Id NVARCHAR(128), Operator NVARCHAR(MAX));

INSERT INTO @UserTab
SELECT
      u.UserId AS Id,
      u.LastName + isnull(' ' + u.FirstName, N'') + isnull(' ' + u.Patronymic, N'') AS Operator
FROM
      [#system_database_name#].[dbo].[User] u
	--  CRM_1551_System.dbo.[User] u
       ;

INSERT INTO @UserTab
SELECT 
	'0' AS Id,
	N'Усі' AS Operator;

SELECT 
	[Id],
	[Operator]
FROM @UserTab
WHERE
     #filter_columns#
     #sort_columns#
     OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;