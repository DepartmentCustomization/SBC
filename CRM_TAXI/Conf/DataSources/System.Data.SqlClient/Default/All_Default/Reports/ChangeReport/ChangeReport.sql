-- DECLARE @dateFrom DATETIME = '2019-11-01 00:00:00';

-- DECLARE @dateTo DATETIME = CURRENT_TIMESTAMP;

SET @dateTo = dateadd(DAY, 1, @dateTo);

SELECT 
   ROW_NUMBER() OVER(ORDER BY part_name ASC) AS Id,
   part_name,
	 articul,
	 manufacturer,
	 part_price,
	 SUM(qty) AS qty,
	 ROUND(part_price * SUM(qty), 2) AS sum_price
FROM (
  SELECT 
  pc.Id,
  p.part_name,
  p.articul,
  p.manufacturer,
  p.part_price,
  1 AS qty

  FROM dbo.PartChange pc 
  INNER JOIN dbo.Parts p ON p.Id = pc.part_id
  WHERE pc.create_date
  BETWEEN 
  @dateFrom AND @dateTo
  ) X
  GROUP BY 
  part_name,
  articul,
  manufacturer,
  part_price ;