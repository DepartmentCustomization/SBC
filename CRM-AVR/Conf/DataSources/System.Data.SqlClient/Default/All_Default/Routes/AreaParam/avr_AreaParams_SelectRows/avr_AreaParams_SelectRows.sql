--DECLARE @route_id INT = 21;

SELECT 
	ap.Id,
	a.Id AS areaId,
	sort AS area_num,
	ISNULL(CAST(d.Size AS NVARCHAR), 'Не вказано') AS Size,
	ISNULL(CAST(ap.Lenght AS NVARCHAR), 'Не вказано') AS Lenght

	FROM Area a
	JOIN AreaParam ap  ON a.Id = ap.AreaID
	LEFT JOIN Diameters d ON d.Id = ap.DiametersID
	  WHERE a.RouteID =  @route_id
	  AND #filter_columns#
	       ORDER BY sort
   OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS only