--   DECLARE @RouteID INT = 72;
--   DECLARE @ClaimID INT = 9097;

IF 
OBJECT_ID('tempdb..##AreaData') 
IS NOT NULL
BEGIN
DROP TABLE ##AreaData;
END

IF OBJECT_ID('tempdb..##AreaPlace') 
IS NOT NULL
BEGIN
DROP TABLE ##AreaPlace;
END

CREATE TABLE ##AreaData (Id INT, AreaLenght INT, BoreCount INT, PlaceName NVARCHAR(1000), Diameters NVARCHAR(100));
CREATE TABLE ##AreaPlace (pos INT, AreaID INT, PlaceName NVARCHAR(300));

DECLARE @AreasQ TABLE (AreaID INT, pos INT);
INSERT INTO @AreasQ (AreaID, pos)
        SELECT 
			Id,
			ROW_NUMBER() OVER(ORDER BY Id)
		FROM dbo.Area 
        WHERE [Type] = 'Дворова' 
		AND RouteID = @RouteID ;

DECLARE @areaStep INT = 1;
DECLARE @move INT = (SELECT COUNT(1) FROM @AreasQ);

WHILE (@areaStep <= @move)
BEGIN
DECLARE @currentAreaID INT = (SELECT AreaID FROM @AreasQ WHERE pos = @areaStep);
INSERT INTO ##AreaPlace (pos, AreaID, PlaceName)
SELECT 
      ROW_NUMBER() OVER (ORDER BY (SELECT 1)) AS pos,
      a.Id AS AreaID,
	  p.[Name] AS PlaceName
FROM dbo.Area a
INNER JOIN dbo.AreaObject ao ON ao.AreaID = a.Id 
INNER JOIN dbo.Places p ON p.ID = ao.PlacesID
WHERE a.RouteID = @RouteID 
AND a.Id = @currentAreaID;

SET @areaStep += 1;
END

DECLARE @AreaStreet TABLE (AreaID INT, StreetName NVARCHAR(300) );

INSERT INTO @AreaStreet 
           (AreaID,  
		   StreetName)

SELECT 
     a.Id,
	 st.UkrName + ISNULL(N' ' + s.[Name], '') 
FROM dbo.AreaObject ao
INNER JOIN dbo.Area a ON a.Id = ao.AreaID
INNER JOIN dbo.Streets s ON s.Id = ao.StreetID
INNER JOIN dbo.Street_Type st ON st.TypeId = s.Street_type_id
WHERE a.RouteID = @RouteID ;

DECLARE @AreaPlaceWithRank TABLE (num INT, pos INT, AreaID INT, PlaceName NVARCHAR(200) );

INSERT INTO @AreaPlaceWithRank (num, pos, AreaID, PlaceName)
SELECT
     ROW_NUMBER() OVER (ORDER BY (SELECT 1)),
	 pos,
	 AreaID,
	 PlaceName 
FROM ##AreaPlace;

INSERT INTO ##AreaData (Id, AreaLenght, BoreCount, PlaceName, Diameters)
SELECT 
DISTINCT
      ar.Id,
	  ar.AreaLenght,
	  ar.BoreCount,
	  NULL,

	  Diameters  = STUFF(
       (SELECT '; ' + CAST((SELECT Size FROM Diameters WHERE Id = app.DiametersID) AS NVARCHAR(10))
        FROM dbo.Area arr
        INNER JOIN dbo.AreaParam app ON arr.Id = app.AreaID
        WHERE ar.Id = app.AreaID
        FOR XML PATH('')), 1, 1, '')
FROM dbo.Area ar 
INNER JOIN dbo.AreaObject ao ON ao.AreaID = ar.Id 
INNER JOIN dbo.AreaParam ap ON ap.AreaID = ar.Id
LEFT JOIN dbo.Streets s ON s.Id = ao.StreetID
LEFT JOIN Street_Type st ON st.TypeId = s.Street_type_id 
WHERE ar.RouteID = @RouteID ;


DECLARE @PlaceQty INT = (SELECT MAX(num) FROM @AreaPlaceWithRank);
DECLARE @step TINYINT = 1;
SET @move = 1;
SET @currentAreaID = (SELECT TOP 1 AreaID FROM @AreasQ);

WHILE(@move <= @PlaceQty)
BEGIN

 UPDATE ##AreaData
 SET PlaceName = 
 CASE 
 WHEN 
 ad.PlaceName IS NULL 
 THEN 
 (SELECT PlaceName FROM @AreaPlaceWithRank WHERE num = @move)
 WHEN (SELECT pos FROM @AreaPlaceWithRank WHERE num = @move) = 4 
 THEN 
 ad.PlaceName + N' ...'
 WHEN (SELECT pos FROM @AreaPlaceWithRank WHERE num = @move) > 4
 THEN ''
 ELSE ad.PlaceName + ', ' +  (SELECT PlaceName FROM @AreaPlaceWithRank WHERE num = @move)
 END COLLATE Cyrillic_General_CI_AS
 FROM ##AreaData ad
 WHERE Id = (SELECT AreaID FROM @AreaPlaceWithRank WHERE num = @move)


SET @move += 1;
END


SELECT 
      Id,
	  AreaLenght,
	  BoreCount,
	  IIF(adata.PlaceName IS NOT NULL ,
	      adata.PlaceName COLLATE Cyrillic_General_CI_AS,
		  astreet.StreetName)
		  AS PlaceName ,
	  Diameters
FROM ##AreaData adata
LEFT JOIN @AreaStreet astreet ON astreet.AreaID = adata.Id  
WHERE Id NOT IN (SELECT AreaID FROM dbo.Claim_Area WHERE ClaimID = @ClaimID)
AND
#filter_columns#
#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;