/*
DECLARE @dateFrom DATETIME = '2020-01-01 00:00:00',
		@dateTo DATETIME = GETDATE();
*/

DECLARE @claims_faucetClosedPlace TABLE (claimId INT, 
										 placeId INT, 
										 placeName NVARCHAR(500), 
										 faucet_size NVARCHAR(10));
INSERT INTO @claims_faucetClosedPlace
SELECT
DISTINCT
	c.Id,
	f_closed_place.Id,
	f_closed_place.[Name],
	CAST(d.Size AS NVARCHAR(10))
FROM dbo.Claims c 
INNER JOIN dbo.Faucet f ON f.Claim_Id = c.Id
INNER JOIN dbo.Places f_closed_place ON f_closed_place.Id = f.Place_Id
LEFT JOIN dbo.[Diameters] d ON d.Id = f.Diametr_Id 
	AND f.Action_types_Id IN (232,48)
WHERE f.Start_from 
BETWEEN @dateFrom AND @dateTo
GROUP BY
	c.Id,
	f_closed_place.Id,
	f_closed_place.[Name],
	d.Size;

DECLARE @claims_faucetSwitchOffPlace TABLE (claimId INT,  
											placeId INT, 
											placeName NVARCHAR(500));


INSERT INTO @claims_faucetSwitchOffPlace
SELECT
DISTINCT
	c.Id,
	swa_place.Id,
	swa_place.[Name]
FROM dbo.Claims c 
INNER JOIN dbo.Faucet f ON f.Claim_Id = c.Id
		AND f.Action_types_Id IN (232,48)
INNER JOIN dbo.Claim_SwitchOff_Address swa ON swa.Faucet_ID = f.Id
INNER JOIN dbo.Places swa_place ON swa_place.Id = swa.Place_Id
WHERE f.Start_from  
BETWEEN @dateFrom AND @dateTo;

SELECT 
DISTINCT
	c.Id,
	c.Claim_Number,
	o.Short_name AS orgName,
	p_main_place.[Name] AS claim_place,
	ct.[Full_Name] AS claim_type,
	faucet_diameter = ISNULL(ltrim(stuff((SELECT ', '+ fcp.faucet_size
           FROM @claims_faucetClosedPlace fcp
		   INNER JOIN dbo.Claims c1 ON c1.Id = fcp.claimId
		   WHERE c1.Id = c.Id
		   GROUP BY fcp.faucet_size
		   ORDER BY fcp.faucet_size	
           FOR XML PATH('')), 1, 1, '')), N'Не вказано'),

	faucet_closed_place = ltrim(stuff((SELECT DISTINCT ', '+ fcp.[placeName]
           FROM @claims_faucetClosedPlace fcp
		   INNER JOIN dbo.Claims c1 ON c1.Id = fcp.claimId
		   WHERE c1.Id = c.Id
           FOR XML PATH('')), 1, 1, '')),

	faucet_switchOff_place = ISNULL(ltrim(stuff((SELECT DISTINCT ', '+ f_swOff_p.[placeName]
           FROM @claims_faucetSwitchOffPlace f_swOff_p
		   INNER JOIN dbo.Claims c1 ON c1.Id = f_swOff_p.claimId
		   WHERE c1.Id = c.Id
		   
           FOR XML PATH('')), 1, 1, '')), N'Всі з водою'),
	MAX(f.Start_from) AS faucet_closedStart,
	MAX(f.Finish_at) AS faucet_closedFinish,
	s.[Name] AS claim_status
FROM dbo.[Claims] c
INNER JOIN @claims_faucetClosedPlace cfcp ON cfcp.claimId = c.Id
INNER JOIN dbo.[Faucet] f ON f.Claim_Id = c.Id 
	AND c.Id IN (SELECT Claim_Id FROM @claims_faucetClosedPlace)
LEFT JOIN dbo.[Action_types] [at] ON [at].Id = f.Action_types_Id
INNER JOIN dbo.[Organizations] o ON o.Id = c.Response_organization_ID
INNER JOIN dbo.[Claim_Order_Places] cop_main_place ON cop_main_place.Claim_ID = c.Id 
	AND cop_main_place.Is_first_place = 1
INNER JOIN dbo.[Places] p_main_place ON p_main_place.Id = cop_main_place.Place_ID 
INNER JOIN dbo.[Claim_types] ct ON ct.Id = c.Claim_type_ID   
INNER JOIN dbo.[Status] s ON s.Id = c.Status_ID
WHERE f.Start_from  
BETWEEN @dateFrom AND @dateTo 
GROUP BY c.Id,
		 c.Claim_Number,
		 o.Short_name,
		 p_main_place.[Name],
		 ct.[Full_Name],
		 s.[Name]
-- AND #filter_columns#
ORDER BY 1
-- OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY
	;