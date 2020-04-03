--DECLARE @route_id INT = 20;

SELECT 
     Id,
	 sort AS area_num
FROM dbo.[Area] 
WHERE RouteID = @route_id
AND #filter_columns#
	 #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;