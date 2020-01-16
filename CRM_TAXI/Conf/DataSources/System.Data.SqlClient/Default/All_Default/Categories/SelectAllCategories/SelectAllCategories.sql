SELECT
    Id,
    category_name,
    category_description,
    operational_period_km,
    operational_period_day,
    min_count_stock
FROM
    Categories
WHERE
    #filter_columns#
    #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY