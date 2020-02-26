-- DECLARE @route_id INT = 21;

SELECT 
DISTINCT
    a.Id
	,sort AS row_num
	,count(1) OVER(PARTITION BY a.Id, a.AreaLenght,a.BoreCount) AS count_places
	,ROUND(a.AreaLenght, 2) AS AreaLenght
	,a.BoreCount
	
	FROM dbo.Area AS a 
	LEFT JOIN AreaObject AS ao ON ao.AreaID = a.Id
	WHERE a.RouteID = @route_id
    AND #filter_columns#
	   -- #sort_columns#
	   ORDER BY sort
    OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY 