-- DECLARE @dateTo DATETIME = CURRENT_TIMESTAMP;

DECLARE @on_arrival TABLE (
    articul NVARCHAR(100),
    [provider] NVARCHAR(100),
    price FLOAT(25),
    quantity INT,
    sum_price FLOAT(25)
);
 DECLARE @on_change TABLE (
    articul NVARCHAR(100),
    price FLOAT(25),
    quantity INT,
    sum_price FLOAT(25)
);

INSERT INTO
    @on_arrival
SELECT
    DISTINCT articul,
    prov.[provider],
    arrival.part_price,
    arrival.part_quantity,
    part.part_price * arrival.part_quantity AS sum_price
FROM
    dbo.Parts part
    INNER JOIN dbo.PartArrival arrival ON arrival.part_id = part.Id
    INNER JOIN dbo.Providers prov ON prov.Id = arrival.provider_id
WHERE
    arrival.create_date  <= @dateTo
    -- select * from @on_arrival
INSERT INTO
    @on_change
SELECT
    DISTINCT articul,
    CHANGE.part_price,
    isnull(count(CHANGE.part_id), 0),
    CHANGE.part_price * count(CHANGE.part_id)
FROM
    dbo.Parts part
    LEFT JOIN dbo.PartChange CHANGE ON CHANGE.part_id = part.Id
WHERE
    CHANGE.create_date <= @dateTo
GROUP BY
    articul,
    CHANGE.part_price ;

SELECT
    Id,
    part_name,
    articul,
    manufacturer,
    [provider],
    part_price,
    qty,
    z.part_price * z.qty AS sum_price
FROM
    (
        SELECT
            DISTINCT p.Id,
            p.part_name,
            p.articul,
            p.manufacturer,
            ar.[provider],
            p.part_price,
            isnull(ar.quantity - isnull(ch.quantity, 0), 0) AS qty
        FROM
            @on_arrival ar
            LEFT JOIN @on_change ch ON ch.articul = ar.articul
            INNER JOIN dbo.Parts p ON ar.articul = p.articul
    ) z
--WHERE
--    qty > 0 ;