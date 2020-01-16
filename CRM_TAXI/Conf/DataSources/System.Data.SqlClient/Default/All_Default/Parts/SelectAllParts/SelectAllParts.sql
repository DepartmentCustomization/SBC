SELECT
    p.Id,
    category_id,
    part_name,
    category_name,
    articul,
    manufacturer
FROM
    Parts p
    JOIN Categories c ON c.Id = p.category_id
WHERE
    #filter_columns#
    #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY