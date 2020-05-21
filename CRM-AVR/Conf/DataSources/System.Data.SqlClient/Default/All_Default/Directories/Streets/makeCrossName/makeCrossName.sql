-- DECLARE @street1 INT = 16024;
-- DECLARE @street2 INT = 16023;

DECLARE @crossName NVARCHAR(200);

SET @crossName = (SELECT TOP 1
						s.[Name] + N' ' + st.AbbrU + N'/' 
				  FROM dbo.[Places] t 
				  INNER JOIN dbo.[Streets] s ON s.Id = t.Street_id
				  INNER JOIN dbo.[Street_Type] st ON st.TypeId = s.Street_type_id
				  WHERE s.Id = @street1 )  
				  + 
				  (SELECT TOP 1
						s.[Name] + N' ' + st.AbbrU 
				  FROM dbo.[Places] t 
				  INNER JOIN dbo.[Streets] s ON s.Id = t.Street_id
				  INNER JOIN dbo.[Street_Type] st ON st.TypeId = s.Street_type_id
				  WHERE s.Id = @street2 ) ;

	SELECT 
		@crossName AS result;