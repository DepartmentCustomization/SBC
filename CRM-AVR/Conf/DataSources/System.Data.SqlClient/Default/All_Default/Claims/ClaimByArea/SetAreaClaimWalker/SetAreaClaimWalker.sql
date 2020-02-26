--  DECLARE @ClaimID INT = 9055;
--  DECLARE @WalkerJobID INT = 19364;

DECLARE @WalkerName NVARCHAR(255) = (SELECT [Name] FROM dbo.Contacts WHERE Job_ID = @WalkerJobID) ;
DECLARE @info TABLE (newStatus INT);

   UPDATE 
   dbo.Claims
   SET [Status_ID] = 3 
   OUTPUT inserted.Status_ID INTO @info(newStatus)
   WHERE Id = @ClaimID ;

   UPDATE 
   dbo.Claim_content
   SET WalkerJobID = @WalkerJobID,
       WalkerName = @WalkerName
   WHERE Claim_Id = @ClaimID ;

   DECLARE @outStatus TINYINT = (SELECT TOP 1 newStatus FROM @info);
   DECLARE @outWalker NVARCHAR(255) = (SELECT WalkerName FROM dbo.Claim_content WHERE Claim_Id = @ClaimID);

   IF
   @outStatus IS NOT NULL
   AND
   @outWalker IS NOT NULL
   BEGIN
    SELECT 'SUCCESS' AS result ;
   END

   IF
   @outStatus IS NULL
   OR
   @outWalker IS NULL
   BEGIN 
    SELECT 'ERROR' AS result ;
   END