-- DECLARE @user_id NVARCHAR(128) = N'd4c01117-6403-4e57-abd5-34e4d6d05962';

DECLARE @UserOrgStructure TABLE(Id INT);  
INSERT INTO @UserOrgStructure

SELECT 
		OrganisationStructureId 
FROM [CRM_AVR_System].[dbo].[UserInOrganisation] 
WHERE UserId = @user_id;

IF EXISTS 
(SELECT 
		Id 
   FROM @UserOrgStructure
   WHERE Id  
   IN (10,15,18) )
BEGIN
SELECT
	r.Id,
	r.Number,
	org.Short_name,
	concat(u.FirstName, ' ', u.LastName) AS Author_userID,
	concat(u2.FirstName, ' ', u2.LastName) AS ChangeBy_userID,
	ROUND(GroupLenght, 2) AS GroupLenght,
	BoreCountAll
FROM
	dbo.[Route] AS r
	LEFT JOIN Organizations AS org ON org.Id = r.OrgId
	LEFT JOIN [CRM_AVR_System].[dbo].[User] AS u ON u.UserId = r.Author_userID
	LEFT JOIN [CRM_AVR_System].[dbo].[User] AS u2 ON u2.UserId = r.ChangeBy_userID
WHERE
	#filter_columns#
	#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;
END

ELSE 
BEGIN
SELECT
	r.Id,
	r.Number,
	org.Short_name,
	concat(u.FirstName, ' ', u.LastName) AS Author_userID,
	concat(u2.FirstName, ' ', u2.LastName) AS ChangeBy_userID,
	ROUND(GroupLenght, 2) AS GroupLenght,
	BoreCountAll
FROM
	dbo.[Route] AS r
	INNER JOIN Organizations AS org ON org.Id = r.OrgId
	INNER JOIN dbo.Jobs j ON j.Organization_ID = r.OrgId 
	LEFT JOIN [CRM_AVR_System].[dbo].[User] AS u ON u.UserId = r.Author_userID
	LEFT JOIN [CRM_AVR_System].[dbo].[User] AS u2 ON u2.UserId = r.ChangeBy_userID
	WHERE j.[Login] = @user_id
AND	#filter_columns#
	#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;
END