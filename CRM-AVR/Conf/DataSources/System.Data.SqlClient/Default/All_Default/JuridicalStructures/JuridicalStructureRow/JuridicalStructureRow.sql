--  DECLARE @Id INT = 105474;

SELECT
    [Organizations].[Id],
    [Organizations].[Name] AS organizations_name,
    dep.Name AS parent_organization,
	dep.Id AS parent_organization_id,
    concat (
        CASE
            WHEN Districts.Name IS NULL THEN Districts.Name
            ELSE Districts.Name + ', '
        END,
        CASE
            WHEN Streets.Name IS NULL THEN Streets.Name
            ELSE Streets.Name + ' '
        END,
        CASE
            WHEN Houses.Number IS NULL THEN Houses.Number
            ELSE Houses.Number
        END,
        CASE
            WHEN Houses.Letter IS NULL THEN Houses.Letter
            ELSE ' ' + Houses.Letter
        END
    ) AS adress_name,
	Houses.Id AS adress_id,
	(SELECT TOP 1 [Number] FROM [dbo].[Organization_phones] WHERE OrganizationID = Organizations.Id)
	AS [Number],
    (SELECT TOP 1 [Comment] FROM [dbo].[Organization_phones] WHERE OrganizationID = Organizations.Id)
    AS phone_comment
FROM
    [dbo].[Organizations] Organizations
    LEFT JOIN [dbo].[Organizations] AS dep ON dep.id = Organizations.Parent_Organization_ID
    LEFT JOIN [dbo].[Houses] Houses ON Houses.Id = Organizations.Houses_ID
    LEFT JOIN [dbo].[Streets] Streets ON Streets.Street_id = Houses.Street_id
    LEFT JOIN [dbo].[Districts] Districts ON Districts.Id = Houses.District_id
WHERE
    [Organizations].Id = @Id ;