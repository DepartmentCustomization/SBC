-- DECLARE @dateTo DATETIME = CURRENT_TIMESTAMP;
DECLARE @FilterDate DATETIME = DATEADD(HOUR, 3, @dateTo);

IF OBJECT_ID('tempdb..##Arrival') IS NOT NULL
AND OBJECT_ID('tempdb..##Change') IS NOT NULL
BEGIN
  DROP TABLE ##Arrival;
  DROP TABLE ##Change;
END
---> Получить запчасть и колво с приходов по дату
   SELECT 
        part_id,
        part_quantity,
		provider_id,
		part_price
    INTO ##Arrival 
    FROM dbo.PartArrival 
    WHERE create_date <= @FilterDate;

---> Получить запчасть и колво ее расходов по дату
   SELECT 
        part_id,
        COUNT(Id) AS changeQty
    INTO ##Change
    FROM dbo.PartChange 
    WHERE create_date <= @FilterDate
	GROUP BY part_id;
    
---> Защитать остаток по приходам-расходам
SELECT
     Id,
	 part_name,
	 articul,
	 manufacturer,
	 [provider],
	 part_price,
	 partVal AS qty,
	 part_price * partVal  AS sum_price
FROM (
	SELECT 
	part.Id,
	part.part_name,
	part.articul,
	part.manufacturer,
	pr.[provider],
	arr.part_price,
	ISNULL(arr.part_quantity - ISNULL(ch.changeQty,0),0) AS partVal
	FROM dbo.Parts part 
	LEFT JOIN ##Arrival arr ON arr.part_id = part.Id 
	LEFT JOIN dbo.Providers pr ON pr.Id = arr.provider_id
    LEFT JOIN ##Change ch ON ch.part_id = part.id
	-- WHERE part.Id = 29
	) Lionel_Messi ;
	-- ORDER BY part_name