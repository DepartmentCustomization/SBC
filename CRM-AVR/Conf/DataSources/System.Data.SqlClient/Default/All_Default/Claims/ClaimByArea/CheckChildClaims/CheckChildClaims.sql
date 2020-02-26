-- DECLARE @Id INT = 9086;

SELECT 
      CASE 
	  WHEN 
	  COUNT(cl.Id) > 0 
	  THEN 1 
	  ELSE 0
	  END AS linkCheck

FROM dbo.Claim_links cl 
INNER JOIN dbo.Claims c ON c.Id = cl.Claim1_ID
WHERE Claim1_ID = @Id ;