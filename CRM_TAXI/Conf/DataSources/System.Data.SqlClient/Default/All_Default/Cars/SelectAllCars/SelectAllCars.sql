SELECT
    Id,
    cars_name,
    cars_number,
    cars_mark,
    cars_year
FROM
    Cars
WHERE
    #filter_columns#
    #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY