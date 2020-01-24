SELECT
    Id,
    [provider] AS provider_name,
    provider_conditions
FROM
    dbo.Providers
WHERE
    #filter_columns#
    #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY