--  DECLARE @AreaID INT = 126;
--  DECLARE @PlaceID INT = 66910;
--  DECLARE @UserId NVARCHAR(128) = 'e5c21e2b-6fab-4928-8824-c13bf12f6d39';

DECLARE @RouteID INT = (SELECT RouteID FROM dbo.[Area] WHERE Id = @AreaID);
DECLARE @info TABLE (Id INT);

IF
(@AreaID IS NOT NULL) 
AND
(@PlaceID IS NOT NULL)
BEGIN

INSERT INTO [dbo].[AreaObject]
           ([AreaID]
           ,[PlacesID])
OUTPUT inserted.Id INTO @info(Id)
     VALUES
           (@AreaID,
		    @PlaceID)

--> Обновить редактировавшего маршрут
    UPDATE dbo.[Route]
	SET ChangeBy_userID = @UserId
	WHERE Id = @RouteID;
	
			SELECT TOP 1 Id FROM @info;
END