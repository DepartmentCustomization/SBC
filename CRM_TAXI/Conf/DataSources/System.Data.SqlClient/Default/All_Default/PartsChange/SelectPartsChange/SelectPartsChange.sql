-- declare @Id int = 163;

SELECT
    pc.Id,
    invoice_consumption,
    CONVERT(varchar(10), pc.create_date, 104) AS change_date,
    p.part_name,
    p.articul AS new_part_name,
    p.Id AS new_part_id,
    z.articul AS old_part_name,
    z.part_id AS old_part_id,
    p.manufacturer,
    c.Id AS cars_id,
    c.cars_name,
    p.part_price,
    p.Id AS part_id
FROM
    PartChange pc
    JOIN Parts p ON pc.part_id = p.Id
    JOIN Cars c ON c.Id = pc.cars_id
    LEFT JOIN (
        SELECT
            pc.Id,
            part_id,
            articul,
            remove_operation_id
        FROM
            PartChange pc
            JOIN Parts p ON p.Id = pc.part_id
        WHERE
            remove_operation_id = @Id
    ) z ON z.remove_operation_id = pc.Id
WHERE
    pc.Id = @Id