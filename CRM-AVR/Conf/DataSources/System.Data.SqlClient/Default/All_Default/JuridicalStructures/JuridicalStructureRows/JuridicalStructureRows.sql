SELECT
    [Organizations].[Id],
    [Organizations].[Name] AS organization_name,
    dep.Name AS parent_organization,
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
    ) AS adress,
	(SELECT TOP 1 [Number] FROM [dbo].[Organization_phones] WHERE OrganizationID = Organizations.Id)
	AS [Number]
FROM
    [dbo].[Organizations] Organizations
    LEFT JOIN [dbo].[Organizations] AS dep ON dep.id = Organizations.Parent_Organization_ID
    LEFT JOIN [dbo].[Houses] Houses ON Houses.Id = Organizations.Houses_ID
    LEFT JOIN [dbo].[Streets] Streets ON Streets.Street_id = Houses.Street_id
    LEFT JOIN [dbo].[Districts] Districts ON Districts.Id = Houses.District_id

WHERE
    Organizations.Is_WC = 2
    AND #filter_columns#
        #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY 
    ;