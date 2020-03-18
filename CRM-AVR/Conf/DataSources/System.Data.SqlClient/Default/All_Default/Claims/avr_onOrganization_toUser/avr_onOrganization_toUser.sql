SELECT
	CASE
		WHEN Organizations.[Name] = N'Зовнішній КЦ' THEN 28
		ELSE Organizations.Id
	END AS Id,
	CASE
		WHEN Organizations.[Name] = N'Зовнішній КЦ' THEN N'невизначено'
		ELSE Organizations.[Name]
	END AS [Name]
FROM
	dbo.Jobs 
	LEFT JOIN dbo.Organizations ON Organizations.Id = Jobs.Organization_ID 
WHERE
	[Login] = @user;