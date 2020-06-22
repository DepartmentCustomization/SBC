DECLARE @Info TABLE ([Id] INT);

SET @parent_organization_id = IIF(@parent_organization_id = 1, NULL, @parent_organization_id);

INSERT INTO [dbo].[Organizations]
		([Name],
		 [Parent_Organization_ID],
		 [Houses_ID],
		 [Is_WC],
		 [Is_selected])
OUTPUT [inserted].[Id] INTO @Info([Id])
     VALUES
           (@organizations_name
		   ,@parent_organization_id
		   ,@adress_id
		   ,2
		   ,0);

DECLARE @orgId INT = (SELECT TOP 1 Id FROM @Info);

IF(@Number IS NOT NULL)
BEGIN
INSERT INTO [dbo].Organization_phones 
			([OrganizationID],
			 [Number],
			 Comment)							
	VALUES (@orgId,
			@Number,
			@phone_comment);
END

SELECT @orgId AS Id;
	RETURN;