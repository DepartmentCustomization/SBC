 --DECLARE @RouteID INT = 17;
 --DECLARE @GUIDPack nvarchar(128) = N'1636CA51-5226-4425-83DC-9F33C1B9EC3C';
 --DECLARE @PlacesID INT = 42061;
 --DECLARE @BoreCount INT = 5;

DECLARE @NewRowId INT;
DECLARE @sortNum INT;
DECLARE @info TABLE (Id INT NOT NULL);

IF (SELECT COUNT(1) FROM dbo.Area WHERE RouteID = @RouteID AND GUIDPack = @GUIDPack) = 0
BEGIN 
---> Получить значение для поля sort нового участка
IF(SELECT COUNT(Id) FROM Area WHERE RouteID = @RouteID) > 0
 BEGIN
SET @sortNum = (SELECT MAX(sort)
					FROM dbo.[Area] 
						WHERE RouteID = @RouteID
							  ) + 1
 END
 ELSE 
 BEGIN
 SET @sortNum = 1;
 END

    INSERT INTO dbo.Area(
	        [RouteID],
			[Type],
			[GUIDPack],
			[BoreCount],
			sort)
	 OUTPUT inserted.Id INTO @info(Id)
	 VALUES(@RouteID,
	        'Дворова',
			@GUIDPack,
			@BoreCount,
			@sortNum);
			
	SET @NewRowId = (SELECT top 1 Id from @info);
	
	---> Up ChangeBy_userID for Router 
    UPDATE dbo.[Route]
    SET ChangeBy_userID = @UserId
    WHERE Id = @RouteID;
    
    ---> Send to MSSSQL proc AreaParams values
	exec [dbo].[sp_ParsingJsonToAreaParameters] @NewRowId, @AreaParam;
END
ELSE
BEGIN
    SET @NewRowId = (SELECT TOP 1 Id FROM dbo.Area WHERE RouteID = @RouteID AND GUIDPack = @GUIDPack);
END;

INSERT INTO dbo.AreaObject(
	        AreaID,
			PlacesID)
	   VALUES (@NewRowId,
	           @PlacesID);

    
SELECT * FROM dbo.AreaObject WHERE AreaID = @NewRowId
