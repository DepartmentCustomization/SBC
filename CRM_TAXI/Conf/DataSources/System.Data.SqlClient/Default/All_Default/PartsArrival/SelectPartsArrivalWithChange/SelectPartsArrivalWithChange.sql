-- DECLARE @Id INT = 11;

SELECT
    p.Id AS part_id,
    c.Id AS category_id
FROM
    dbo.PartArrival pa
    JOIN Parts p ON p.Id = pa.part_id
    JOIN Categories c ON c.Id = p.category_id
WHERE
    pa.Id = @Id ;