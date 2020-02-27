-- DECLARE @ClaimID INT = 9081;

SELECT 
      ca.Id,
	  a.sort AS area,
	  IIF(a.[Type] = 'Дворова',
	      p.[Name],
		  st.UkrName + ISNULL(N' ' + s.[Name],'')
		  ) AS placeName

FROM dbo.Claim_Area ca 
INNER JOIN dbo.Claims cl ON cl.Id = ca.ClaimID 
INNER  JOIN dbo.Area a ON a.Id = ca.AreaID
INNER JOIN dbo.AreaObject ao ON ao.AreaID = a.Id
LEFT JOIN dbo.Places p ON p.Id = ao.PlacesID
LEFT JOIN dbo.Streets s ON s.ID = ao.StreetID
LEFT JOIN dbo.Street_Type st ON st.TypeId = s.Street_type_id

WHERE ca.ClaimID = @ClaimID
AND
#filter_columns#
#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;