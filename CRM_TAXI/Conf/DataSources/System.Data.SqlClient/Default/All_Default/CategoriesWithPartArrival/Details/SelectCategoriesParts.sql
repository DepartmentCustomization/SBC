SELECT
    Id,
    articul,
    part_name,
    part_quantity
FROM
    Parts
WHERE
    category_id = @Id
    AND #filter_columns#
        #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;