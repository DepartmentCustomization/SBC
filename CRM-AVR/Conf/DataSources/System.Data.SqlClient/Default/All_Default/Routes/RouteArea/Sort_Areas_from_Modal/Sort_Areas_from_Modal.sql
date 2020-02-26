-- DECLARE @route_id INT = 21;

SELECT 
      Id,
	  ROUND(AreaLenght, 2) AS AreaLenght,
	  sort

	  FROM dbo.[Area]
	  WHERE RouteID = @route_id ;