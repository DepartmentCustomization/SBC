DECLARE @current_month TINYINT = (
    SELECT
        MONTH(CURRENT_TIMESTAMP)
);

DECLARE @current_year INT = (
    SELECT
        year(CURRENT_TIMESTAMP)
);

DECLARE @onMonthStart INT;

DECLARE @onMonthEnd INT;

DECLARE @monthKm INT;

SET
    @onMonthStart = (
        SELECT
            TOP 1 run_km
        FROM
            [dbo].RunCar
        WHERE
            car_id = @Id
            AND YEAR(create_date) = @current_year
            AND MONTH(create_date) = @current_month
            AND DAY(create_date) BETWEEN 1
            AND 5
    );

SET
    @onMonthEnd = (
        SELECT
            TOP 1 run_km
        FROM
            [dbo].RunCar
        WHERE
            car_id = @Id
            AND year(create_date) = @current_year
            AND MONTH(create_date) = @current_month
            AND DAY(create_date) BETWEEN 25
            AND 31
    );
SET
    @monthKm = @onMonthEnd - @onMonthStart;
SELECT
    @onMonthStart AS 'Начало месяца',
    @onMonthEnd AS 'Конец месяца',
    @monthKm AS 'За месяц'
WHERE
    #filter_columns#
    #sort_columns#
