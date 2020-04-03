-- DECLARE @ClaimID INT = 9081;

SELECT 
      ca.Id,
	  a.sort AS area,
	  ap.Lenght,
	  d.Size AS Diameter

FROM dbo.Claim_Area ca 
INNER JOIN dbo.Claims cl ON cl.Id = ca.ClaimID 
INNER  JOIN dbo.Area a ON a.Id = ca.AreaID
INNER JOIN dbo.AreaParam ap ON ap.AreaID = a.Id
INNER JOIN dbo.Diameters d ON d.Id = ap.DiametersID
WHERE ca.ClaimID = @ClaimID
AND
#filter_columns#
#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;