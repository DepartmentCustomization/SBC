
DECLARE @dateFrom DATETIME = '2020-08-01 00:00:00',
		@dateTo DATETIME = GETDATE();

DECLARE @closedClaims TABLE (userId NVARCHAR(128), closedDate DATE, closedVal INT);

INSERT INTO @closedClaims (userId, closedDate, closedVal)
SELECT 
	c_h.[User],
	c_h.closedDate,
	COUNT(claim.Id) 
FROM dbo.Claims claim 
INNER JOIN (SELECT 
				c_h.[User],
				c_h.Claims_ID,
				CAST(MAX([Date]) AS DATE) closedDate
			FROM dbo.Claims_History c_h
			GROUP BY c_h.[User],
					 Claims_ID) c_h ON c_h.Claims_ID = claim.Id
	AND claim.Status_ID = 5
	AND c_h.closedDate BETWEEN @dateFrom AND @dateTo
GROUP BY c_h.[User],
		 c_h.closedDate;

SELECT * FROM @closedClaims ORDER BY closedDate

SELECT 
	CAST(claim.Created_at AS DATE) AS workDate,
	COUNT(claim.Id) AS createdClaim,
	[sys_user].[LastName] + SPACE(1) + [sys_user].[FirstName] AS operatorName,
	org.[Short_name] AS operatorOrg
FROM CRM_AVR_System.dbo.[User] AS [sys_user]
INNER JOIN SysUser_OrgWC u_org ON [u_org].[SystemUser_Id] = [sys_user].[UserId]
INNER JOIN dbo.Organizations org ON u_org.OrganizationWC_Id = org.Id
--INNER JOIN CRM_AVR_System.dbo.[OrganisationStructure] org ON [org].[Id] = [u_org].[OrganisationStructureId]
INNER JOIN dbo.[Claims] claim ON claim.[User] = [sys_user].UserId
	AND claim.[Created_at] BETWEEN @dateFrom AND @dateTo
	--AND [sys_user].[UserName] <> N'Administrator'
GROUP BY CAST(claim.Created_at AS DATE),
		 [sys_user].[LastName] + SPACE(1) + [sys_user].[FirstName],
		 org.[Short_name]
ORDER BY 1,3;