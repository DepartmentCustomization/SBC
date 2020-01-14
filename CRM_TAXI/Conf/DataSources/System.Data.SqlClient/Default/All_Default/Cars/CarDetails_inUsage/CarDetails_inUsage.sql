IF(
    (@category IS NOT NULL)
    AND (@car IS NOT NULL)
    AND (@changeId IS NULL)
)
BEGIN
    SELECT
        p.Id,
        p.articul,
        p.part_name
    FROM
        PartChange pc
        JOIN Parts p ON p.Id = pc.part_id
    WHERE
        cars_id = @car
        AND p.category_id = @category
        AND pc.remove_operation_id IS NULL
        AND #filter_columns#
        #sort_columns#
END

IF(
    (@category IS NULL)
    AND (@car IS NOT NULL)
    AND (@changeId IS NOT NULL)
)
BEGIN
DECLARE @old_parts TABLE (
    changeId INT,
    part_id INT,
    articul INT,
    part_name NVARCHAR(255)
);
BEGIN
INSERT INTO
    @old_parts
SELECT
    pc.Id,
    p.Id,
    p.articul,
    p.part_name
FROM
    PartChange pc
    JOIN Parts p ON p.Id = pc.part_id
WHERE
    cars_id = @car
    AND pc.remove_operation_id IS NULL
    AND pc.Id < @changeId
INSERT INTO
    @old_parts
SELECT
    pc.Id,
    p.Id,
    p.articul,
    p.part_name
FROM
    PartChange pc
    JOIN Parts p ON p.Id = pc.part_id
WHERE
    cars_id = @car
    AND pc.remove_operation_id = @changeId
END
DELETE FROM
    @old_parts
WHERE
    changeId = @changeId
SELECT
    part_id AS Id,
    articul,
    part_name
FROM
    @old_parts
WHERE
    #filter_columns#
    #sort_columns#
END
