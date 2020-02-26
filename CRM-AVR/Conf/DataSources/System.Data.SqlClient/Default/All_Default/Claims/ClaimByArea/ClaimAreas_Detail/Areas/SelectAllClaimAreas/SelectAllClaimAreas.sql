-- DECLARE @Id INT = 9081;

SELECT 
     ca.Id,
	 a.[sort],
	 a.[Type],
	 a.AreaLenght,
	 a.BoreCount

FROM dbo.Claim_Area ca 
INNER JOIN dbo.Area a ON a.Id = ca.AreaID
WHERE ca.ClaimID = @Id 
AND #filter_columns#
    #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;