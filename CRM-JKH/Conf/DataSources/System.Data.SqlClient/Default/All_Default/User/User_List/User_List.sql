SELECT 
u.UserId as Id,
u.LastName + N' ' + u.FirstName + isnull(N' ' + u.Patronymic,N'') + N' (' + u.UserName + N')' AS Name

FROM [#system_database_name#].dbo.[User] u
WHERE
 #filter_columns#
 #sort_columns#
 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only