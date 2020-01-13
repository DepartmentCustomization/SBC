SELECT
    Id,
    cars_name,
    cars_mark,
    cars_number
FROM
    Cars
WHERE
    #filter_columns#
    #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY
