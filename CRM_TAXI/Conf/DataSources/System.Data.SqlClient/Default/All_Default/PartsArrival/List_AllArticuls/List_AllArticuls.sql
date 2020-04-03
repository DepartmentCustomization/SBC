SELECT
    Id,
    articul,
    part_name
FROM
    dbo.Parts 
WHERE #filter_columns#
      #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY