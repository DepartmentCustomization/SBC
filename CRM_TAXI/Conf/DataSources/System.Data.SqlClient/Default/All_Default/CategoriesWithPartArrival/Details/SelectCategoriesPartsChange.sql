-- DECLARE @Id INT = 3;

DECLARE @removal_part TABLE (
    part_change_id INT,
    part_id INT,
    invoice_consumption NVARCHAR(100),
    cars_name INT,
    instrall_date DATETIME,
    remove_id INT
);

BEGIN
INSERT INTO
    @removal_part
SELECT
    pc.Id,
    p.Id AS part_id,
    pc.invoice_consumption,
    c.cars_name,
    pc.install_date,
    pc.remove_operation_id
FROM
    dbo.PartChange pc
    INNER JOIN dbo.Parts p ON p.Id = pc.part_id
    INNER JOIN dbo.Cars c ON c.Id = pc.cars_id
WHERE
    p.category_id = @Id;
END 
--select * from @removal_part
DECLARE @removeInfo TABLE (
    Id INT,
    invoice_consumption NVARCHAR(100),
    part_name NVARCHAR(100),
    remove_date DATETIME,
    cars_name INT
);

INSERT INTO
    @removeInfo
SELECT
    rp.part_change_id AS Id,
    rp.invoice_consumption,
    p.[part_name] AS part_name,
    rp.instrall_date AS remove_date,
    rp.cars_name
FROM
    @removal_part rp
   INNER JOIN dbo.Parts p ON p.Id = part_id;

SELECT
    Id,
    invoice_consumption,
    part_name,
    remove_date,
    cars_name
FROM
    @removeInfo
ORDER BY
    remove_date DESC OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;