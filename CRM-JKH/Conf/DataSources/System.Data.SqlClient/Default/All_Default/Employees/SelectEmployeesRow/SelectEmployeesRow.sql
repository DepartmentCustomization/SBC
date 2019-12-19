SELECT 
e.Id,
organization_id,
o.Name as orgName,
PIB,
position,
e.phone_1,
e.phone_2,
e.UserId as [User],
u.LastName + N' ' + u.FirstName + isnull(N' ' + u.Patronymic,N'') AS UserPIB

FROM dbo.employees e
INNER JOIN dbo.organizations o on o.Id = e.organization_id
LEFT JOIN [#system_database_name#].dbo.[User] u ON u.UserId = e.UserId
WHERE e.Id = @Id