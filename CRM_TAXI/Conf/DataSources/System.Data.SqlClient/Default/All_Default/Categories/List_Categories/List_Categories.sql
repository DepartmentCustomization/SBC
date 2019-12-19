SELECT
    Id,
    category_name
FROM
    Categories
WHERE 
    #filter_columns#
    #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY