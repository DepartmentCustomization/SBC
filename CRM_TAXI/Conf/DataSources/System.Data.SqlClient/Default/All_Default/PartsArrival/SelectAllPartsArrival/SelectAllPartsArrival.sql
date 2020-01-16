SELECT
    pa.Id,
    invoice_number,
    pa.create_date,
    p.part_name,
    p.articul,
    p.manufacturer,
    pr.[provider],
    pa.part_price,
    pa.part_quantity,
    pa.part_price * pa.part_quantity AS sum_price
FROM
    PartArrival pa
    JOIN Parts p ON p.Id = pa.part_id
    JOIN Providers pr ON pr.Id = pa.provider_id
WHERE
    #filter_columns# 
    ORDER BY pa.create_date DESC 
OFFSET @pageOffsetRows ROWS fetch next @pageLimitRows rows only