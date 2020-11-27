SELECT
DISTINCT
    [Id],
    [Name]
FROM 
    dbo.[Organizations] o
WHERE
    is_Contract_organization = 1
AND #filter_columns#
    #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;