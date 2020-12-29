
/*
DECLARE @dateFrom DATETIME = '2020-11-30T22:00:00.000Z',
		@dateTo DATETIME = GETDATE();
*/
--обработка мест по засувкам новое начало

IF OBJECT_ID('tempdb..#claims_faucetClosedPlace2') IS NOT NULL DROP TABLE #claims_faucetClosedPlace2

SELECT [Faucet].Id Faucet_Id, [Faucet].Claim_Id, Places.Name places_name, 

CONVERT(datetime, SWITCHOFFSET([Faucet].Start_from, DATEPART(TZOFFSET,[Faucet].Start_from AT TIME ZONE 'E. Europe Standard Time'))) Start_from,

--[Faucet].Start_from, 

CONVERT(datetime, SWITCHOFFSET([Faucet].Finish_at, DATEPART(TZOFFSET,[Faucet].Finish_at AT TIME ZONE 'E. Europe Standard Time'))) Finish_at,

--[Faucet].Finish_at,

	Diameters.Size diameters_size
into #claims_faucetClosedPlace2
FROM [dbo].[Faucet]
	left join Diameters on Diameters.Id = Faucet.Diametr_Id
	left join Places on Places.Id = Faucet.Place_Id
WHERE [Faucet].Start_from BETWEEN @dateFrom AND @dateTo
--обработка мест по засувкам новое конец
/*

---> обработка мест по засувкам
IF OBJECT_ID('tempdb..#claims_faucetClosedPlace') IS NOT NULL
BEGIN
	DROP TABLE #claims_faucetClosedPlace;
END 
CREATE TABLE #claims_faucetClosedPlace ( Id INT IDENTITY(1,1),
										 claimId INT, 
										 placeId INT, 
										 placeName NVARCHAR(500), 
										 faucet_size NVARCHAR(10),
										 processed BIT)
										 WITH (DATA_COMPRESSION = PAGE);
INSERT INTO #claims_faucetClosedPlace
SELECT
DISTINCT
	c.Id,
	f_closed_place.Id,
	f_closed_place.[Name],
	CAST(d.Size AS NVARCHAR(10)),
	0
FROM dbo.Claims c 
INNER JOIN dbo.Faucet f ON f.Claim_Id = c.Id
INNER JOIN dbo.Places f_closed_place ON f_closed_place.Id = f.Place_Id
LEFT JOIN dbo.[Diameters] d ON d.Id = f.Diametr_Id 
WHERE f.Start_from 
BETWEEN @dateFrom AND @dateTo
GROUP BY
	c.Id,
	f_closed_place.Id,
	f_closed_place.[Name],
	d.Size
ORDER BY c.Id, f_closed_place.Id;

DECLARE @current_id INT,
		@cur_charindex INT,
		@claim INT,
		@place NVARCHAR(500);

WHILE (SELECT COUNT(1) FROM #claims_faucetClosedPlace WHERE processed <> 1) > 0
BEGIN
SET @cur_charindex = NULL;
SET	@place = NULL;

SELECT TOP 1
	@current_id = Id
FROM #claims_faucetClosedPlace
WHERE processed <> 1;

SELECT TOP 1
	@claim = claimId
FROM #claims_faucetClosedPlace
WHERE Id = @current_id;

	IF EXISTS (SELECT 
					Id 
		       FROM #claims_faucetClosedPlace 
			   WHERE claimId = @claim
			   AND placeId = (SELECT placeId FROM #claims_faucetClosedPlace WHERE Id = @current_id)
			   AND Id < @current_id)
	BEGIN
		UPDATE #claims_faucetClosedPlace
			SET [placeName] = NULL 
		WHERE Id = @current_id;
	END
	ELSE 
	BEGIN
	SET @cur_charindex = (SELECT CHARINDEX(',', placeName) FROM #claims_faucetClosedPlace WHERE Id = @current_id);
	IF (@cur_charindex > 0)
	BEGIN
		SET @place = (SELECT SUBSTRING(placeName, 1, @cur_charindex-1) FROM #claims_faucetClosedPlace WHERE Id = @current_id);

		IF EXISTS (SELECT 
						Id 
				   FROM #claims_faucetClosedPlace 
				   WHERE SUBSTRING(placeName, 1, @cur_charindex-1) LIKE '%'+@place+'%'
				   AND claimId = @claim
				   AND Id < @current_id)
		BEGIN
		UPDATE #claims_faucetClosedPlace 
			SET placeName = SUBSTRING(placeName, @cur_charindex+2, LEN(PlaceName))
		WHERE Id = @current_id;
		END

	END
	END

	UPDATE #claims_faucetClosedPlace 
		SET processed = 1 
	WHERE Id = @current_id;
END

IF OBJECT_ID('tempdb..#claims_faucetSwitchOffPlace') IS NOT NULL
BEGIN
	DROP TABLE #claims_faucetSwitchOffPlace;
END 
CREATE TABLE #claims_faucetSwitchOffPlace ( Id INT IDENTITY(1,1),
											claimId INT,  
											placeId INT, 
											placeName NVARCHAR(500),
											processed BIT)
											WITH (DATA_COMPRESSION = PAGE);

INSERT INTO #claims_faucetSwitchOffPlace
SELECT
DISTINCT
	c.Id,
	swa_place.Id,
	swa_place.[Name],
	0
FROM dbo.Claims c 
INNER JOIN dbo.Faucet f ON f.Claim_Id = c.Id
INNER JOIN dbo.Claim_SwitchOff_Address swa ON swa.Faucet_ID = f.Id
INNER JOIN dbo.Places swa_place ON swa_place.Id = swa.Place_Id
WHERE f.Start_from  
BETWEEN @dateFrom AND @dateTo
ORDER BY c.Id, swa_place.Id;

---> обработка оключенных мест по засувкам
WHILE (SELECT COUNT(1) FROM #claims_faucetSwitchOffPlace WHERE processed <> 1) > 0
BEGIN
SET @cur_charindex = NULL;
SET	@place = NULL;

SELECT TOP 1
	@current_id = Id
FROM #claims_faucetSwitchOffPlace
WHERE processed <> 1;

SELECT TOP 1
	@claim = claimId
FROM #claims_faucetSwitchOffPlace
WHERE Id = @current_id;

	IF EXISTS (SELECT 
					Id 
		       FROM #claims_faucetSwitchOffPlace 
			   WHERE claimId = @claim
			   AND placeId = (SELECT placeId FROM #claims_faucetSwitchOffPlace WHERE Id = @current_id)
			   AND Id < @current_id)
	BEGIN
		DELETE FROM #claims_faucetSwitchOffPlace 
		WHERE Id = @current_id;
	END
	ELSE 
	BEGIN
	SET @cur_charindex = (SELECT CHARINDEX(',', placeName) FROM #claims_faucetSwitchOffPlace WHERE Id = @current_id);
	IF (@cur_charindex > 0)
	BEGIN
		SET @place = (SELECT SUBSTRING(placeName, 1, @cur_charindex-1) FROM #claims_faucetSwitchOffPlace WHERE Id = @current_id);
		
		IF EXISTS (SELECT 
						Id 
				   FROM #claims_faucetSwitchOffPlace 
				   WHERE SUBSTRING(placeName, 1, @cur_charindex-1) LIKE '%'+@place+'%'
				   AND claimId = @claim
				   AND Id < @current_id)
		BEGIN
		UPDATE #claims_faucetSwitchOffPlace 
			SET placeName = SUBSTRING(placeName, @cur_charindex+2, LEN(PlaceName))
		WHERE Id = @current_id;
		END

	END
	END

	UPDATE #claims_faucetSwitchOffPlace 
		SET processed = 1 
	WHERE Id = @current_id;
END

DECLARE @targettimezone AS sysname = 'E. Europe Standard Time';
*/
SELECT 
	c.Id,
	c.Claim_Number,
	o.Short_name AS orgName,
	p_main_place.[Name] AS claim_place,
	ct.[Full_Name] AS claim_type,
	--faucet_diameter = ISNULL(ltrim(stuff((SELECT ', '+ fcp.faucet_size
 --          FROM #claims_faucetClosedPlace fcp
	--	   INNER JOIN dbo.Claims c1 ON c1.Id = fcp.claimId
	--	   WHERE c1.Id = c.Id
	--	   GROUP BY fcp.faucet_size
	--	   ORDER BY fcp.faucet_size	
 --          FOR XML PATH('')), 1, 1, '')), N'Не вказано'),

 isnull(ltrim(cfcp.diameters_size),N'Не вказано') faucet_diameter,

	--faucet_closed_place = ltrim(stuff((SELECT ', '+ fcp.[placeName]
 --          FROM #claims_faucetClosedPlace fcp
	--	   INNER JOIN dbo.Claims c1 ON c1.Id = fcp.claimId
	--	   WHERE c1.Id = c.Id
	--	   ORDER BY fcp.placeId
 --          FOR XML PATH('')), 1, 1, '')),
	cfcp.places_name faucet_closed_place,

	--faucet_switchOff_place = ISNULL(ltrim(stuff((SELECT ', '+ f_swOff_p.[placeName]
 --          FROM #claims_faucetSwitchOffPlace f_swOff_p
	--	   INNER JOIN dbo.Claims c1 ON c1.Id = f_swOff_p.claimId
	--	   WHERE c1.Id = c.Id
	--	   ORDER BY f_swOff_p.placeId
 --          FOR XML PATH('')), 1, 1, '')), N'Всі з водою'),

	isnull(stuff((
  select N', '+isnull(p.Name, N'')
  from [dbo].[Claim_SwitchOff_Address] cs
  inner join [dbo].[Places] p on cs.Place_ID=p.Id
  where cs.[Claim_ID]=cfcp.Claim_Id and cs.[Faucet_ID]=cfcp.Faucet_Id
  for xml path('')),1,2,N''), N'Всі з водою') faucet_switchOff_place,

	--> convert в текст нужного формата с учетом utc
	--CONVERT(VARCHAR, dateadd(MINUTE,datepart(tz, MAX(f.Start_from) 
	--AT TIME ZONE @targettimezone), MAX(f.Start_from)), 4) + SPACE(1) + 
	--CONVERT(VARCHAR, dateadd(MINUTE,datepart(tz, MAX(f.Start_from) 
	--AT TIME ZONE @targettimezone), MAX(f.Start_from)), 8)
	--	AS faucet_closedStart,
	--ltrim(cfcp.Start_from) faucet_closedStart,
	format(cfcp.Start_from, 'dd.MM.yy HH:mm:ss') faucet_closedStart,
	--CONVERT(VARCHAR, dateadd(MINUTE,datepart(tz, MAX(f.Finish_at) 
	--AT TIME ZONE @targettimezone), MAX(f.Finish_at)), 4) + SPACE(1) + 
	--CONVERT(VARCHAR, dateadd(MINUTE,datepart(tz, MAX(f.Finish_at) 
	--AT TIME ZONE @targettimezone), MAX(f.Finish_at)), 8)
	--	AS faucet_closedFinish,
	--ltrim(cfcp.Finish_at) faucet_closedFinish,
	format(cfcp.Finish_at, 'dd.MM.yy HH:mm:ss') faucet_closedFinish,
	s.[Name] AS claim_status
FROM dbo.[Claims] c
--INNER JOIN #claims_faucetClosedPlace cfcp ON cfcp.claimId = c.Id
inner join #claims_faucetClosedPlace2 cfcp on c.Id=cfcp.Claim_Id
--INNER JOIN dbo.[Faucet] f ON f.Claim_Id = c.Id 
LEFT JOIN dbo.[Action_types] [at] ON [at].Id = cfcp.Faucet_Id
INNER JOIN dbo.[Organizations] o ON o.Id = c.Response_organization_ID
INNER JOIN dbo.[Claim_Order_Places] cop_main_place ON cop_main_place.Claim_ID = c.Id 
	AND cop_main_place.Is_first_place = 1
INNER JOIN dbo.[Places] p_main_place ON p_main_place.Id = cop_main_place.Place_ID 
INNER JOIN dbo.[Claim_types] ct ON ct.Id = c.Claim_type_ID   
INNER JOIN dbo.[Status] s ON s.Id = c.Status_ID
--WHERE f.Start_from  
--BETWEEN @dateFrom AND @dateTo 
--GROUP BY c.Id,
--		 c.Claim_Number,
--		 o.Short_name,
--		 p_main_place.[Name],
--		 ct.[Full_Name],
--		 s.[Name],
--		 isnull(ltrim(cfcp.diameters_size),N'Не вказано'),
--		 cfcp.places_name,
--		 cfcp.Start_from,
--		 cfcp.Finish_at
-- AND #filter_columns#
ORDER BY 1
-- OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY
	;

	--select * from #claims_faucetClosedPlace2
