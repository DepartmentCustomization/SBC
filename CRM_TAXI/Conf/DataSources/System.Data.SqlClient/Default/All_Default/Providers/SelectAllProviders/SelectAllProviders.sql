SELECT
    Id,
    [provider],
    provider_conditions
FROM
    Providers
WHERE
    #filter_columns#
    #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY