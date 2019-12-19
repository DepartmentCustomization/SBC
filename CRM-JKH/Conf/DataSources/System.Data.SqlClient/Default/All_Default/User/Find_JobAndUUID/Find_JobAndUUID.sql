-- DECLARE @PIB nvarchar(300) = 'Test DispatcherCNAP User';

SELECT TOP 1
uio.JobTitle AS position,
u.UserId,
u.LastName + N' ' + u.FirstName + isnull(N' ' + u.Patronymic,N'') AS PIB

FROM [#system_database_name#].dbo.[User] u
INNER JOIN [#system_database_name#].dbo.UserInOrganisation uio ON u.UserId = uio.UserId
WHERE u.UserId = @UserId
AND uio.OrganisationStructureId <> 1 