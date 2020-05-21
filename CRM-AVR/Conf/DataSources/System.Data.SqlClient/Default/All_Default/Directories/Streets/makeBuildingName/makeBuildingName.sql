-- DECLARE @street INT = 16024;
-- DECLARE @building_name NVARCHAR(20) = N'500Д'; 

DECLARE @placeName NVARCHAR(200);

SET @placeName = (SELECT TOP 1
						s.[Name] + N' ' + st.UkrName  
						+ ISNULL( N', ' + @building_name,N'') 
				  FROM dbo.[Places] t 
				  INNER JOIN dbo.[Streets] s ON s.Id = t.Street_id
				  INNER JOIN dbo.[Street_Type] st ON st.TypeId = s.Street_type_id
				  WHERE s.Id = @street ) ;


	SELECT 
		@placeName AS result;