SELECT
    pc.Id,
    invoice_consumption,
    CONVERT(VARCHAR(10), pc.create_date, 104) AS change_date,
    p.part_name,
    p.articul,
    p.manufacturer,
    c.cars_name,
    pc.part_price
FROM
    PartChange pc
    JOIN Parts p ON pc.part_id = p.Id
    JOIN Cars c ON c.Id = pc.cars_id
WHERE
    #filter_columns#
    ORDER BY pc.create_date DESC
    OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY