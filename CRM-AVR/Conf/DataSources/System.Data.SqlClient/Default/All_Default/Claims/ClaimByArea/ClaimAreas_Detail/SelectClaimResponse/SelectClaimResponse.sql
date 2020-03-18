-- DECLARE @ClaimID INT = 9081;

SELECT
      cl.DisplayID,
	  res.[Description] AS choosenResponse
FROM dbo.Claim_content c
INNER JOIN dbo.Claims cl ON cl.Id = c.Claim_Id
INNER JOIN dbo.[Response] res ON res.Id = c.ResponseID
WHERE Claim_Id = @ClaimID ;