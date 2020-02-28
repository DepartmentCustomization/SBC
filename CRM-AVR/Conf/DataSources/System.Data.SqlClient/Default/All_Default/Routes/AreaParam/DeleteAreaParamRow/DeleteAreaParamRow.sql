--DECLARE @Id INT = 127;

DECLARE @AreaID INT = (SELECT AreaID FROM dbo.AreaParam WHERE Id = @Id);
DECLARE @RouteID INT = (SELECT RouteID FROM Area WHERE Id = @AreaID);
DECLARE @AreaParamQty INT = (SELECT 
                                COUNT(Id)								 
                                FROM dbo.AreaParam
								WHERE AreaID = @AreaID);
								
IF(@AreaParamQty > 1)
 BEGIN 

 DECLARE @Length INT = (SELECT Lenght FROM dbo.AreaParam WHERE Id = @Id);

	DELETE 
	FROM dbo.[AreaParam] 
	WHERE Id = @Id;

--> Up Area/Route vals  
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
   		WHERE RouteID = @RouteID)
	WHERE Id = @RouteID;
 END 

ELSE IF(@AreaParamQty = 1) 
 BEGIN
  RAISERROR (N'Помилка! Видяляємий параметр останній по ділянці.', 16, 1);
 END