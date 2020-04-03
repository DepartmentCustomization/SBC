SELECT
    p.Id AS Id,
    p.[part_name] AS partName,
    p.articul,
    pc.install_date,
    x.partQty,
    ROUND(pc.part_price,3) AS part_price
FROM
    PartChange pc
    JOIN Parts p ON p.Id = pc.part_id
    JOIN (
        SELECT
            pc.part_id,
            COUNT(pc.Id) AS partQty
        FROM
            PartChange pc
            JOIN Parts p ON pc.part_id = p.Id
        WHERE
            cars_id = @Id
        GROUP BY
            part_id
    ) x ON x.part_id = pc.part_id
WHERE
    pc.cars_id = @Id
    AND remove_operation_id IS NULL
    AND #filter_columns#
    #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY