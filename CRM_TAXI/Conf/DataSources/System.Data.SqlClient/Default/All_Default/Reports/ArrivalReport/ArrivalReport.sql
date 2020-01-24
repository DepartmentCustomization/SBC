--declare @dateFrom datetime = '2019-11-01 00:00:00';
--declare @dateTo datetime = current_timestamp;

SELECT
    arrival.Id,
    part.part_name,
    part.articul,
    part.manufacturer,
    provid.[provider],
    arrival.part_price,
    arrival.part_quantity,
    arrival.part_price * arrival.part_quantity AS sum_price
FROM
    PartArrival arrival
    JOIN Parts part ON part.Id = arrival.part_id
    JOIN Providers provid ON provid.Id = arrival.provider_id
WHERE
    arrival.create_date BETWEEN @dateFrom
    AND dateadd(DAY, 1, @dateTo)