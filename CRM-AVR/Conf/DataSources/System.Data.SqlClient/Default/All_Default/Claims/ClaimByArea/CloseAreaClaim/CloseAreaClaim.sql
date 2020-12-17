/*
DECLARE @ClaimID INT = 9055,
		    @ResponseID INT = 1,
		    @UserID NVARCHAR(128) = '29796543-b903-48a6-9399-4840f6eac396';
*/
IF
(@ClaimID IS NOT NULL)
AND
(@ResponseID IN (1,20))
BEGIN

  UPDATE dbo.Claims
    SET Status_ID = 5,
        Fact_finish_at = GETUTCDATE()
  WHERE Id = @ClaimID ;

  UPDATE dbo.Claim_content
	SET ResponseID = @ResponseID
  WHERE Claim_Id = @ClaimID ;

  UPDATE dbo.Claims_History
	SET [User] = @UserID 
  WHERE Id = (SELECT MAX(Id) FROM Claims_History WHERE Claims_ID = @ClaimID) ;

  SELECT 'OK' AS result;

END

IF
(@ClaimID IS NOT NULL)
AND
(@ResponseID NOT IN (1,20))
BEGIN

DECLARE @IsHavingChild BIT = (SELECT 
									CASE 
									WHEN COUNT(Id) > 0
									THEN 1
									ELSE 0
									END
									FROM dbo.Claim_links 
									WHERE Claim1_ID = @ClaimID );
 IF(@IsHavingChild = 1)
  BEGIN
   UPDATE dbo.Claims
	SET Status_ID = 5,
		Fact_finish_at = GETUTCDATE()
   WHERE Id = @ClaimID ;
   
   UPDATE dbo.Claim_content
		SET ResponseID = @ResponseID
   WHERE Claim_Id = @ClaimID ;
   
   UPDATE dbo.Claims_History
	    SET [User] = @UserID
   WHERE Id = (SELECT MAX(Id) FROM Claims_History WHERE Claims_ID = @ClaimID);
   
   SELECT 'OK' AS result;
  END

  IF(@IsHavingChild = 0)
  BEGIN
   
   UPDATE dbo.Claim_content
	SET ResponseID = @ResponseID
   WHERE Claim_Id = @ClaimID ;
   
   SELECT 'NOT_OK' AS result;
  END
END