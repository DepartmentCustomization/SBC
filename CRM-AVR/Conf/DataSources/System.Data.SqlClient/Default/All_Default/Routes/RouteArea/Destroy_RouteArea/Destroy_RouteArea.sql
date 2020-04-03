-- DECLARE @Id INT = 168;

DECLARE @isUsed BIT = (SELECT CASE 
								WHEN COUNT(1) > 0 THEN 1
								ELSE 0 END  
						FROM dbo.Claim_Area WHERE AreaID = @Id) ;

IF(@isUsed = 1)
BEGIN
	RAISERROR(N'Неможливо видалити Ділянку, бо по ній вже зареєстрована ЗАЯВКА обхідника',16,1);
	RETURN;
END

BEGIN TRY 

  BEGIN TRANSACTION;
  
---> Получить Route удаляемого участка, в конце пересчет значений  
DECLARE @RouteID INT = (SELECT RouteID FROM dbo.Area WHERE Id = @Id) ;

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

    COMMIT ;
END TRY

BEGIN CATCH 
DECLARE @msg NVARCHAR(MAX) = ERROR_MESSAGE();
  THROW 70000, @msg, 1; 
  ROLLBACK;
END CATCH ;