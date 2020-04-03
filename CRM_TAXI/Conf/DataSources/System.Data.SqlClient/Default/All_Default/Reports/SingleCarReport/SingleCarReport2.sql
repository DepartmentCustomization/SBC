--  declare @dateFrom datetime = '2019-11-01 00:00:00';
--  declare @dateTo datetime = '2019-12-01 00:00:00';
--  declare @carId int = 9;
IF (@dateFrom IS NOT NULL)
AND (@dateTo IS NOT NULL) 
BEGIN
SELECT
    Id,
    part_name,
    articul,
    manufacturer,
    run_km_period,
    run_day_period,
    qty,
    part_price
FROM
    PartsChange_Group
WHERE
    change_date BETWEEN cast(dateadd(HOUR, 3, @dateFrom) AS date)
    AND cast(dateadd(DAY, 1, @dateTo) AS date)
    AND cars_name = (
        SELECT
            cars_name
        FROM
            dbo.Cars 
        WHERE
            Id = @carId
    ) ;
END
ELSE BEGIN
SET
    @dateFrom = dateadd(MONTH, -1, CURRENT_TIMESTAMP)
SET
    @dateTo = cast(CURRENT_TIMESTAMP AS date)
SELECT
    Id,
    part_name,
    articul,
    manufacturer,
    run_km_period,
    run_day_period,
    qty,
    part_price
FROM
    PartsChange_Group
WHERE
    change_date BETWEEN @dateFrom
    AND @dateTo
    AND cars_name = (
        SELECT
            cars_name
        FROM
            dbo.Cars 
        WHERE
            Id = @carId
    ) ;
END