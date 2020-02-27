-- DECLARE @Id INT = 137;

BEGIN TRY 

  BEGIN TRANSACTION
  
---> Получить Route удаляемого участка, в конце пересчет значений  
DECLARE @RouteID INT = (SELECT RouteID FROM Area WHERE Id = @Id);

---> Удалить данные Area по цепочке
  DELETE 
  FROM dbo.AreaParam
  WHERE AreaID = @Id ;

  DELETE 
  FROM dbo.AreaObject 
  WHERE AreaID = @Id ;


  DELETE 
  FROM dbo.Area
  WHERE Id = @Id ;
  
---> Пересчитать значения маршрута
UPDATE dbo.[Route]
SET GroupLenght = (
		SELECT ISNULL(SUM(AreaLenght),0)  
		FROM dbo.Area 
		WHERE RouteID = @RouteID),
    BoreCountAll = (
	      SELECT ISNULL(SUM(BoreCount),0) 
		  FROM dbo.Area 
		  WHERE RouteID = @RouteID),
    ChangeBy_userID = @UserId
    
	WHERE Id = @RouteID;

    COMMIT
END TRY

BEGIN CATCH 

  PRINT 'ERROR ' + ERROR_MESSAGE();

END CATCH