-- DECLARE @ClaimID INT = 9054;
-- DECLARE @AreaID INT = 173;
-- DECLARE @RouteID INT = 22;

IF
(@ClaimID IS NOT NULL)
AND
(@AreaID IS NOT NULL)
BEGIN

      INSERT INTO dbo.Claim_Area
	              (ClaimID,
				  RouteID,
				  AreaID)
		VALUES
		(@ClaimID,
		@RouteID,
		@AreaID) ;

		SELECT * 
		FROM dbo.Claim_Area 
		WHERE Id = @ClaimID;
END