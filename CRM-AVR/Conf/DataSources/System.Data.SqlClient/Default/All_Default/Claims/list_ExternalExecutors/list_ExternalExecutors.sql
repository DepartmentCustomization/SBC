SELECT
DISTINCT
    o.[Id],
    o.[Name]
FROM
    dbo.[Organizations] o
    JOIN dbo.[Contacts] c ON c.Organisation_ID = o.Id
WHERE
    c.Contact_type_ID = 2
    AND o.is_External_service = 1
    AND #filter_columns#
        #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;