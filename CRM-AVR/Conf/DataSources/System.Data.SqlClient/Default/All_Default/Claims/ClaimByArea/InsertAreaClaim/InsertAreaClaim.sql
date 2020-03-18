/* test params

DECLARE @Claim_type_ID INT = 7100;
DECLARE @Claim_class_ID INT = 21;
DECLARE @Description NVARCHAR(MAX) = 'ГО НА ОБХОД';
DECLARE @Status_id INT = 1; 
DECLARE @Organization_id INT = NULL;
DECLARE @User NVARCHAR(128) = '7ddf9e9f-2a7b-4b81-9b5d-528722558bd6';
DECLARE @Sked NVARCHAR(100) = 'Зима 2020';
DECLARE @RouteID INT = 46;
*/

DECLARE @info TABLE (Id INT);
BEGIN TRY
    BEGIN TRANSACTION
		
			INSERT INTO [dbo].[Claims]
				   (
				   [First_claim_type_ID]
				   ,[Claim_type_ID]
				   ,Claim_class_ID
				   ,[First_description]
				   ,[Description]
				   ,[Status_ID]
				   ,[Response_organization_ID]
				   ,[Created_at]
				--  ,[Plan_start_date]
				--  ,[Plan_finish_at]
				--  ,[Priority]
				--  ,[Report_action_id]
				--  ,Fact_finish_at
				--  ,Diameters_ID
				   ,Is_Template
				   ,[User]
				--   ,Contact_ID
				--   ,Contact_ID_Fiz
				--   ,date_check
				--   ,not_balans
				   ,DisplayID
				   )
		OUTPUT [inserted].[Id] INTO @info(Id)
			 VALUES
				   (@Claim_type_ID 
				   ,@Claim_type_ID
				   ,@Claim_class_ID
				   ,@Description
				   ,@Description
				   ,ISNULL(@Status_id, 1)
				   ,ISNULL(@Response_organization_ID, 28)
				   ,GETUTCDATE()
				--   ,@Plan_start_date
				--   ,isnull(@Plan_finish_at , (DATEADD(day, 14, @Plan_start_date)))
				--   ,@Priority
				--   ,@Report_action_id
				--   ,@Fact_finish_at
				--   ,@Diameters_ID
				   ,0
				   ,@User
				--   ,@contact_id
				--   ,@contact_id_fiz
				--   ,@date_check
				--   ,@not_balans
				   ,2
				   ) ;

		DECLARE @Claim_Number INT = (SELECT TOP 1 Id FROM @info);

		UPDATE [dbo].[Claims] 
		SET Claim_Number = @Claim_Number,								
			[Priority] = isnull((SELECT [Priority]  
										FROM [dbo].[Claim_types] 
										WHERE Claim_types.Id = @Claim_type_ID),5)
		WHERE Id = @Claim_Number;
		
    --DECLARE @WalkerName NVARCHAR(300) = (SELECT [Name] FROM dbo.Contacts WHERE Job_ID = @WalkerJobID);
		
				INSERT INTO [dbo].[Claim_content]
					   ([Claim_Id]
					   ,[Sked]
					   ,RouteID
					   --,WalkerJobID
					   --,WalkerName
					   --,ResponseID 
					   )
				 VALUES
					   (@Claim_Number
					   ,@Sked
					   ,@RouteID
					   --,@WalkerJobID
					   --,@WalkerName
					   --,@ResponseID
					   ) ;

    COMMIT TRANSACTION
    
    select @Claim_Number as Id;
	return;

  END TRY
  BEGIN CATCH
    IF @@TRANCOUNT > 0
    ROLLBACK TRANSACTION;
    
    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    
    select N'Помилка заповнення: ' +  @ErrorMessage

  END CATCH