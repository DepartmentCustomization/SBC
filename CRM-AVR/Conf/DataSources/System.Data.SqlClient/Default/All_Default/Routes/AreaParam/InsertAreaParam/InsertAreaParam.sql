--  DECLARE @AreaId INT = 1;
--  DECLARE @diameter INT = 12;
--  DECLARE @length INT = 4;
--  DECLARE @UserId NVARCHAR(128) = 'a360b5fc-42d8-491d-99e2-7326d7bd494e';

DECLARE @route_id INT = (SELECT RouteID FROM dbo.[Area] WHERE Id = @AreaId);

--> Если значения параметров корректы - стартует транзакция
IF
(@length IS NOT NULL AND CAST(@length AS Numeric(18,6)) > 1.0  )
AND 
(@diameter IS NOT NULL)
BEGIN
  INSERT INTO [dbo].[AreaParam] 
                    (AreaID, 
  				  DiametersID, 
  				  Lenght)
    VALUES(
           @AreaId,
    	   @diameter,
    	   @length ) ;
     
--> Up route/area values 
UPDATE [dbo].[Area] 
SET AreaLenght = (
  SELECT SUM(ISNULL([Lenght],0)) 
  FROM [dbo].[AreaParam] 
      WHERE [AreaId] = @AreaId)
WHERE Id = @AreaId;

UPDATE dbo.[Route]
SET GroupLenght = (
		SELECT ISNULL(SUM(AreaLenght),0)  
		FROM dbo.Area 
		WHERE RouteID = @route_id)
	WHERE Id = @route_id;
END

IF
(CAST(@length AS Numeric(18,6)) < 1.1)
BEGIN
RAISERROR ('Помилка! Довжина має бути більше 1',5,1);
END