-- DECLARE @Id INT = 1;

SELECT 
      r.Id,
	  [Description],
	  ct.Id AS claimTypeID,
	  ct.[Name] AS claimTypeName,
	  ta.Id AS typeAccessID,
      ta.[Name] AS typeAccessName

FROM dbo.Response r
INNER JOIN dbo.TypeAccess ta ON ta.Id = r.TypeAccess_ID
LEFT JOIN dbo.Claim_types ct ON ct.Id = r.Claim_type
WHERE r.Id = @Id ;