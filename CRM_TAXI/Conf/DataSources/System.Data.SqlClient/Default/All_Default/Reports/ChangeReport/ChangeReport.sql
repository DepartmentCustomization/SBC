-- DECLARE @dateFrom DATETIME = '2019-11-01 00:00:00';

-- DECLARE @dateTo DATETIME = CURRENT_TIMESTAMP;

SELECT
    Id,
    part_name,
    articul,
    manufacturer,
    [provider],
    part_price,
    qty,
    sum_price
FROM
    PartsChange_Group
WHERE
    change_date BETWEEN @dateFrom
    AND dateadd(DAY, 1, @dateTo)