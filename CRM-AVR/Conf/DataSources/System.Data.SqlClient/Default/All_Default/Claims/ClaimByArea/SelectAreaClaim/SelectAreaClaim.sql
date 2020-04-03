-- DECLARE @Id INT = 9055;

 DECLARE @CreatorName NVARCHAR(200) = (SELECT 
											ISNULL(LastName + N' ','') + 
                                            ISNULL(FirstName + N' ','') + 
											ISNULL(Patronymic,'') 
										FROM CRM_AVR_System.dbo.[User] 
										WHERE UserID = (SELECT 
										                     [User] 
														FROM dbo.Claims 
														WHERE Id = @Id));

SELECT 
      cl.Id,
      cl.Id AS claims_id,
	  Claim_Number,
	  cl.Claim_class_ID,
	  clcl.[Name] AS Claim_class_Name,
	  cl.Claim_type_ID,
	  ct.[Full_Name] AS Claim_type_FullName,
	  Status_ID AS Status_id,
	  st.[Name] AS statusName,
	  cl.Response_organization_ID,
	  o.[Name] AS Repsonse_organization_Name,
	  Created_at,
	  @CreatorName AS [User],
	  cl.[Description],

	  IIF(cl.Status_ID = 5,
	   (SELECT 
	    TOP 1 ch.[Date] 
	    FROM Claims cl
		LEFT JOIN Claims_History ch ON ch.Claims_ID = cl.Id
	    WHERE cl.id = @Id 
		ORDER BY ch.Id DESC),
		NULL ) AS date_close,

      IIF(cl.Status_ID = 5,
	  (SELECT ISNULL(LastName + N' ','') + 
              ISNULL(FirstName + N' ','') + 
			  ISNULL(Patronymic,'')   
	    FROM CRM_AVR_System.dbo.[User] 
	    WHERE UserID = (SELECT [User] 
						FROM dbo.Claims_History 
						WHERE Id = (SELECT MAX(Id) FROM dbo.Claims_History WHERE Claims_ID = @Id))),
		NULL ) AS user_close,

	   clco.Sked,
	   clco.RouteID,
	   ro.[Number] AS routeNumber,
	   clco.WalkerJobID,
	   clco.WalkerName,
	   clco.ResponseID,
	   re.[Description] AS RepsonseName 

FROM dbo.Claims cl 
INNER JOIN Claim_classes clcl ON clcl.Id = cl.Claim_class_ID
INNER JOIN Claim_types ct ON ct.Id = cl.Claim_type_ID
INNER JOIN Organizations o ON o.Id = cl.Response_organization_ID
INNER JOIN dbo.[Status] st ON st.Id = cl.Status_ID
INNER JOIN dbo.Claim_content clco ON clco.Claim_Id = cl.Id 
INNER JOIN dbo.[Route] ro ON ro.Id = clco.RouteID
LEFT JOIN dbo.[Response] re ON re.Id = clco.ResponseID
WHERE cl.Id = @Id ;