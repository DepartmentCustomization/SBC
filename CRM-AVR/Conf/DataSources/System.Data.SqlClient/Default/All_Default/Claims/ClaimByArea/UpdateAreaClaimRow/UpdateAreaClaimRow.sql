UPDATE dbo.Claims 
SET Response_organization_ID = @Response_organization_ID,
    [Description] = @Description
WHERE Id = @Id ;

UPDATE dbo.Claim_content
SET Sked = @Sked,
    ResponseID = @ResponseID
WHERE Claim_Id = @Id ;
