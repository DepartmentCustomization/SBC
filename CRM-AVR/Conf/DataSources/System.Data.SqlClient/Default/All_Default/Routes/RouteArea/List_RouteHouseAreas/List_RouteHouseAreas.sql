--DECLARE @route_id INT = 21;

SELECT 
    Id,
    sort AS [Name]
FROM Area
WHERE RouteID = @route_id
AND [Type] = 'Дворова' 
AND #filter_columns#
    #sort_columns#
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;