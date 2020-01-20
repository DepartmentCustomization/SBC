SELECT
    pa.Id,
    invoice_number,
    part_name,
    pa.create_date AS arrival_date,
    pa.part_quantity,
    pa.part_price * pa.part_quantity AS sum_price
FROM
    PartArrival pa
    JOIN Parts p ON pa.part_id = p.Id
WHERE
    category_id = @Id
    AND 
     #filter_columns# 
     ORDER BY
    pa.create_date DESC OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY