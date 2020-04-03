SELECT
    part_name,
    manufacturer
FROM
    dbo.Parts
WHERE
    Id = @partId ;