-- DECLARE @Id INT = 1013;

SELECT
    pa.Id,
    invoice_number,
    pa.create_date,
    p.Id AS articul,
	p.articul AS articul_name,
	p.part_name,
    p.manufacturer,
	pr.Id AS [provider],
    pr.[provider] AS provider_name,
    pa.part_price,
    pa.part_quantity,
    pa.part_price * pa.part_quantity AS sum_price
FROM
    dbo.PartArrival pa
    INNER JOIN dbo.Parts p ON p.Id = pa.part_id
    INNER JOIN dbo.Providers pr ON pr.Id = pa.provider_id
WHERE
    pa.Id = @Id ;