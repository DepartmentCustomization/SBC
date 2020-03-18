-- DECLARE @OrderID INT = 10714;

DECLARE @ClaimID INT = (SELECT Claim_ID FROM dbo.Orders WHERE Id = @OrderID);
DECLARE @OrderNums TABLE (Id INT, pos INT);

INSERT INTO @OrderNums
SELECT 
    Id,
	ROW_NUMBER() OVER(ORDER BY Id) AS pos
FROM dbo.Orders
WHERE Claim_ID = @ClaimID ;

SELECT 
     pos
FROM @OrderNums
WHERE Id = @OrderID ; 