IF(@categoryId IS NOT NULL) 
BEGIN
SELECT
    Id,
    articul,
    part_name
FROM
    dbo.Parts
WHERE
    category_id = @categoryId
    AND 
    #filter_columns#
    #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only
END

ELSE 
BEGIN
SELECT
    Id,
    articul,
    part_name
FROM
    dbo.Parts
WHERE
    #filter_columns#
    #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only
END