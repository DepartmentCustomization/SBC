--   declare @dateFrom datetime = '2019-11-02 00:00:00';
--   declare @dateTo datetime = '2019-11-30 00:00:00';
DECLARE @cars TABLE (
    Id INT,
    [number] NVARCHAR(50),
    [name] INT,
    mark NVARCHAR(100),
    [create_year] INT
) ;
 DECLARE @cars_start_run TABLE (car_id INT, start_period_run INT) ;
 DECLARE @cars_end_run TABLE (car_id INT, end_period_run INT) ;
 DECLARE @cars_period_run TABLE (car_id INT, pediod_run INT);
 DECLARE @car_parts_price TABLE (car_id INT, change_price FLOAT(25)) ;

  BEGIN 
  ----------------------> Start finding data <---------------------------
INSERT INTO
    @cars
SELECT
    DISTINCT Id,
    cars_number,
    cars_name,
    cars_mark,
    cars_year
FROM
    dbo.Cars car ;

INSERT INTO
    @cars_start_run
SELECT
    car.Id,
    isnull(max(run_km), 0) run_km
FROM
    dbo.RunCar run
    JOIN @cars car ON car.Id = run.car_id
WHERE
    CAST(run.create_date AS DATE) <= dateadd(HOUR, 3, @dateFrom)
GROUP BY
    car.Id ;
    --select * from @cars_start_run

INSERT INTO
    @cars_end_run
SELECT
    car.Id,
    isnull(max(run_km), 0) run_km
FROM
    dbo.RunCar run
    JOIN @cars car ON car.Id = run.car_id
WHERE
    CAST(run.create_date AS DATE) <= dateadd(HOUR, 3, @dateTo)
    AND 
    CAST(run.create_date AS DATE) > dateadd(HOUR, 3, @dateFrom)
GROUP BY
    car.Id ;
    --select * from @cars_end_run

INSERT INTO
    @cars_period_run
SELECT
    s.car_id,
    e.end_period_run - s.start_period_run AS pedior_run
FROM
    @cars_start_run s
    JOIN @cars_end_run e ON e.car_id = s.car_id ;
    --select * from @cars_period_run

INSERT INTO
    @car_parts_price
SELECT
    car.Id,
    isnull(sum(CHANGE.part_price), 0) AS change_price
FROM
    @cars car
    LEFT JOIN dbo.PartChange CHANGE ON CHANGE.cars_id = car.Id
WHERE
    CAST(CHANGE.create_date AS DATE) BETWEEN dateadd(HOUR, 3, @dateFrom)
    AND dateadd(DAY, 1, @dateTo)
GROUP BY
    car.Id ;
    --select * from @car_parts_price
    ----------------------> End finding data <---------------------------
END
SELECT
    car.Id,
    car.number,
    car.[name],
    car.mark,
    car.create_year,
    start_run.start_period_run,
    end_run.end_period_run,
    period_run.pediod_run,
    isnull(parts.change_price, 0) AS change_price
FROM
    @cars car
    INNER JOIN @cars_start_run start_run ON start_run.car_id = car.Id
    INNER JOIN @cars_end_run end_run ON end_run.car_id = car.Id
    INNER JOIN @cars_period_run period_run ON period_run.car_id = car.Id
    LEFT JOIN @car_parts_price parts ON parts.car_id = car.Id ;