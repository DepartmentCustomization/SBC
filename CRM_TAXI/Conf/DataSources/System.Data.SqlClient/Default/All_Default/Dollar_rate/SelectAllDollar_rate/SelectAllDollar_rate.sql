SELECT
    Id,
    dollar_date,
    dollar_rate
FROM
    Dollar_rate
WHERE
    #filter_columns#
    #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY