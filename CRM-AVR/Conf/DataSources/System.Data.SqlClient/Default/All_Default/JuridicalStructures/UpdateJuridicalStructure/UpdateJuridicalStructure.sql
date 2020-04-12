SET @parent_organization_id = IIF(@parent_organization_id = 1, NULL, @parent_organization_id);

UPDATE 
dbo.Organizations
SET [Name] = @organizations_name,
	[Parent_Organization_ID] = @parent_organization_id,
	[Houses_ID] = @adress_id 
WHERE Id = @Id ; 

DECLARE @IsExist BIT = (SELECT CASE 
								WHEN COUNT(1) = 0
								THEN 0 
								ELSE 1 END 
						FROM dbo.Organization_phones
						WHERE OrganizationID = @Id)
IF(@IsExist = 1)
BEGIN
	UPDATE
	dbo.Organization_phones 
	SET [Number] = @Number,
	[Comment] = @phone_comment
	WHERE OrganizationID = @Id ;
END
ELSE IF(@IsExist = 0)
BEGIN 
INSERT INTO [dbo].Organization_phones 
			([OrganizationID],
			 [Number],
			 Comment)							
	VALUES (@Id,
			@Number,
			@phone_comment);
END