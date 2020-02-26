-- DECLARE @RouteID INT = 21;
-- DECLARE @AreaType INT = 1;
-- DECLARE @BoreCount INT = 20;
-- DECLARE @StreetID INT = 2917;
-- DECLARE @AreaParam NVARCHAR(MAX);


DECLARE @info TABLE ([Id] INT);
DECLARE @sortNum INT;
---> Задать номерок sort нового участка 
IF(SELECT COUNT(Id) FROM Area WHERE RouteID = @RouteID) > 0
 BEGIN
SET @sortNum = (SELECT MAX(sort)
					FROM dbo.[Area] 
						WHERE RouteID = @RouteID
							  ) + 1
		SELECT @sortNum ;
 END
 ELSE 
 BEGIN
 SET @sortNum = 1;
 END

BEGIN
--- >  Area
	INSERT INTO [dbo].[Area]
           ([RouteID]
           ,[Type]
           ,[BoreCount]
		   ,sort
		   )
     OUTPUT [inserted].[Id] INTO @info([Id])
     VALUES(
	        @RouteID
           ,'Вулична'
           ,@BoreCount
		   ,@sortNum );

DECLARE @area_id INT = (SELECT TOP 1 Id FROM @info);  

--->  AreaObect

	INSERT INTO [dbo].[AreaObject]
			   ([AreaID]
			   ,[StreetID])
	     VALUES(
		        @area_id
			   ,@StreetID
			     );

--->  AreaParam
exec dbo.sp_ParsingJsonToAreaParameters  @area_id, @AreaParam;

---> Up ChangeBy_userID 
    UPDATE dbo.Route
    SET ChangeBy_userID = @UserId
    WHERE Id = @RouteID;
    
    SELECT @area_id;
END