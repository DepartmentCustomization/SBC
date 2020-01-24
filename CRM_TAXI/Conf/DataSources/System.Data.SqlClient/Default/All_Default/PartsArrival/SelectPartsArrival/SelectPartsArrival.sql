-- DECLARE @Id INT = 1013;

SELECT
    pa.Id,
    invoice_number,
    pa.create_date,
    p.Id AS articul,
	p.part_name,
    p.manufacturer,
	pr.Id AS [provider],
    pr.[provider] AS provider_name,
    pa.part_price,
    pa.part_quantity,
    pa.part_price * pa.part_quantity AS sum_price
FROM
    PartArrival pa
    INNER JOIN Parts p ON p.Id = pa.part_id
    INNER JOIN Providers pr ON pr.Id = pa.provider_id
WHERE
    pa.Id = @Id