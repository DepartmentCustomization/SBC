SELECT 
      r.Id,
	  [Description],
	  ct.[Name] AS claimType,
      ta.[Name] AS typeAccess
FROM dbo.Response r
INNER JOIN dbo.TypeAccess ta ON ta.Id = r.TypeAccess_ID
LEFT JOIN dbo.Claim_types ct ON ct.Id = r.Claim_type
WHERE #filter_columns#
      #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;