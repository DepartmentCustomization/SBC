DECLARE @output TABLE (Id INT);

BEGIN TRY
    BEGIN TRANSACTION;
		
			INSERT INTO [dbo].[Route]
           ([Number]
           ,[OrgId]
           ,[Author_userID]
           ,[ChangeBy_userID]
        --   ,[Description]
        --   ,[GroupLenght]
        --   ,[BoreCountAll]
           )
	OUTPUT [inserted].[Id] INTO @output([Id])
     VALUES
           (
			@Number
           ,ISNULL(@OrgId,28)
           ,@Author_userID
           ,@ChangeBy_userID
        --   ,@Description
        --   ,@GroupLenght
        --   ,@BoreCountAll
           ) ;

	declare @RouteID int;
	set @RouteID = (select top 1 Id from @output);

    COMMIT TRANSACTION;

	select @RouteID as [Id];
	return;

  END TRY
  BEGIN CATCH
    IF @@TRANCOUNT > 0
    ROLLBACK TRANSACTION;
    
    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    
    select N'Помилка заповнення: ' +  @ErrorMessage

  END CATCH