-- DECLARE @Id INT = 11;

SELECT
    p.Id AS part_id,
    c.Id AS category_id
FROM
    dbo.[Parts] p 
    INNER JOIN dbo.[Categories] c ON c.Id = p.category_id
WHERE
    p.Id = @Id ; 