DECLARE @last_KM INT = (
    SELECT
        run_km
    FROM
        [dbo].RunCar
    WHERE
        car_id = @Id
        AND create_date = (
            SELECT
                MAX(create_date)
            FROM
                [dbo].RunCar
            WHERE
                car_id = @Id
        )
);
SELECT
    Id,
    cars_name,
    cars_number,
    cars_mark,
    cars_year,
    @last_KM cars_run
FROM
    [dbo].Cars
WHERE
    Id = @Id;
