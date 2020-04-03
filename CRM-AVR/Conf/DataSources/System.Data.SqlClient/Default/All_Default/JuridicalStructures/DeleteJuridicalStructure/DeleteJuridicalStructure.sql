-- DECLARE @Id INT = 105474;

DECLARE @InClaim BIT = IIF( 
						(SELECT 
							COUNT(1) 
						FROM dbo.Claims 
						WHERE UR_organization_ID = @Id) = 0,
						0,
						1);

IF(@InClaim = 1)
BEGIN
	RAISERROR(N'Організацію не можливо видалити, тому що вона застосовується в заявках', 11, 1);
	RETURN;
END

ELSE 
BEGIN 
	DELETE 
	FROM dbo.Organizations
	WHERE Id = @Id ;
END