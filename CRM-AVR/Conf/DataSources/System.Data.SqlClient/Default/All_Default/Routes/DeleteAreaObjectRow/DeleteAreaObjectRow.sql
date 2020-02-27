-- DECLARE @Id INT = 259;

DECLARE @AreaID INT = (SELECT AreaID FROM dbo.[AreaObject] WHERE Id = @Id);
DECLARE @RouteID INT = (SELECT RouteID FROM Area WHERE Id = @AreaID);
DECLARE @AreaObjQty INT = (SELECT 
                                COUNT(Id)								 
                                FROM dbo.[AreaObject]
								WHERE AreaID = @AreaID);
								
IF(@AreaObjQty > 1)
 BEGIN 

	DELETE 
	FROM dbo.[AreaObject] 
	WHERE Id = @Id;
	
	UPDATE 
	dbo.[Route]
	SET ChangeBy_userID = @UserId
	WHERE Id = @RouteID;

 END 

ELSE IF(@AreaObjQty = 1) 
 BEGIN
  RAISERROR (N'Помилка! Видяляєме місце останнє по ділянці.', 16, 1);
 END