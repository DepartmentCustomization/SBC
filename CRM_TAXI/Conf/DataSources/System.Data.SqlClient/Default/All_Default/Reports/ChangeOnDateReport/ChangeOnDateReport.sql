-- DECLARE @dateTo DATETIME = '2019-11-28 00:00:00';
DECLARE @filterDate DATE = CAST(DATEADD(HOUR, 3, @dateTo) AS DATE);

SELECT
DISTINCT
    Id,
    part_name,
    articul,
    manufacturer,
    run_km_period,
    run_day_period,
    cars_number,
    part_price,
    qty,
    sum_price
FROM
    dbo.PartsChange_Group
WHERE
    change_date = @filterDate ;