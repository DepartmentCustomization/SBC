-- DECLARE @dateTo DATETIME = CURRENT_TIMESTAMP;

SET @dateTo = DATEADD(HOUR, 3, @dateTo);

IF OBJECT_ID('tempdb..##Arrival') IS NOT NULL
AND OBJECT_ID('tempdb..##Change') IS NOT NULL
BEGIN
  DROP TABLE ##Arrival;
  DROP TABLE ##Change;
END
---> Получить запчасть и колво с приходов по дату
   SELECT 
        part_id,
        SUM(part_quantity) AS part_quantity,
		AVG(part_price) AS part_price
    INTO ##Arrival 
    FROM dbo.PartArrival 
    WHERE create_date <= @dateTo
	GROUP BY part_id;

---> Получить запчасть и колво ее расходов по дату
   SELECT 
        part_id,
        COUNT(Id) AS changeQty
    INTO ##Change
    FROM dbo.PartChange 
    WHERE create_date <= @dateTo
	GROUP BY part_id;
    
---> Защитать остаток по приходам-расходам
     SELECT 
	       p.Id,
		   part_name,
		   articul,
		   manufacturer,
		   ar.part_price,
		   ar.part_quantity - ISNULL(ch.changeQty,0) AS qty,
		   ar.part_price * (ar.part_quantity - ISNULL(ch.changeQty,0)) 
		   AS sum_price

		   FROM dbo.Parts p
		   INNER JOIN ##Arrival ar ON ar.part_id = p.Id 
		   LEFT JOIN ##Change ch ON ch.part_id = p.Id ;