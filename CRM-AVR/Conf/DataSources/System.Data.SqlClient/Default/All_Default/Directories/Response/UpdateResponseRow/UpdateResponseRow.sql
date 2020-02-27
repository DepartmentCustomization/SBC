--DECLARE @Id INT = 1;
--DECLARE @Description NVARCHAR(255) = 'Відсутня лапка в кришці';
--DECLARE @ClaimTypeID INT = 12;
--DECLARE @typeAccessID INT = 2;

UPDATE dbo.Response
SET [Description] = @Description,
    Claim_type = @claimTypeID,
	TypeAccess_ID = @typeAccessID 
WHERE Id = @Id ;