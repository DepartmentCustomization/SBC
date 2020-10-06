SELECT
DISTINCT
    o.[Id],
    o.[Name],
	c.Contact_type_ID
FROM
    dbo.[Organizations] o
    INNER JOIN dbo.[Contacts] c ON c.Organisation_ID = o.Id
WHERE
    o.is_External_service = 1
	AND c.Contact_type_ID = 5
	AND #filter_columns#
        #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;