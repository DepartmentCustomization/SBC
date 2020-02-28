-- DECLARE @route_id INT = 9;

SELECT      ao.Id,
            sort AS area_num,
			a.Id AS area,
			CASE 
			--- Указано место 
			WHEN ao.PlacesID IS NOT NULL 
			THEN p.[Name]

			--- Указано улицу
			WHEN ao.StreetID IS NOT NULL 
			THEN CONCAT(st.AbbrU , ' ', s.[Name])
			 
			-- Не указано ни место ни улица
			WHEN 
			ao.PlacesID IS NULL 
			AND
			ao.StreetID IS NULL 
			THEN 'Не вказано' 

			END AS place_name

			FROM AreaObject ao 
			INNER JOIN Area a ON a.Id = ao.AreaID
			LEFT JOIN Places p ON p.Id = ao.PlacesID
			LEFT JOIN Streets as s on s.Id = ao.StreetID
			LEFT JOIN  Street_Type as st on st.TypeId = s.Street_type_id
			WHERE 
			ao.AreaID 
			IN (
			    SELECT Id
			    FROM Area 
			    WHERE RouteID = @route_id
			    )
		   AND #filter_columns#
	            ORDER BY sort
           OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY