
DECLARE @WalkerName NVARCHAR(255) = (SELECT [Name] FROM dbo.Contacts WHERE Job_ID = @WalkerJobID) ;

UPDATE dbo.Claims 
SET Response_organization_ID = @Response_organization_ID,
    [Description] = @Description,
    [Status_ID] = 3
WHERE Id = @Id ;

UPDATE dbo.Claim_content
SET Sked = @Sked,
    ResponseID = @ResponseID,
    WalkerJobID = @WalkerJobID,
    WalkerName = @WalkerName
WHERE Claim_Id = @Id ;
