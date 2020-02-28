declare @output table ([Id] int);
declare @contact_id int
declare @contact_id_fiz int

   if @contact_type = 3
	    begin
    		set @contact_id = @EM_contact_fio
			set @contact_id_fiz = @EM_org_id
    	end
    if @contact_type = 2
    	begin
			set  @contact_id = (select Contacts_ID 
			                    from Organizations 
			                    where Id = @UR_organization_id );
			set  @contact_id_fiz =  @UR_contact_fio
	    end
	 if @contact_type = 1 
	    begin
	        set @contact_id = @FIZ_concact_id
	        set @contact_id_fiz = null
	    end

BEGIN TRY
    BEGIN TRANSACTION;
		
			INSERT INTO [dbo].[Claims]
				   (
				   [First_claim_type_ID]
				   ,[Claim_type_ID]
				   ,[First_description]
				   ,[Description]
				   ,[Status_ID]
				   ,[Response_organization_ID]
				   ,[Created_at]
				   ,[Plan_start_date]
				   ,[Plan_finish_at]
				   ,[Priority]
				   ,[Report_action_id]
				   ,Fact_finish_at
				   ,Diameters_ID
				   ,Is_Template
				   ,[User]
				   ,Contact_ID
				   ,Contact_ID_Fiz
				   ,date_check
				   ,not_balans
				   ,DisplayID
				   )
		output [inserted].[Id] into @output([Id])
			 VALUES
				   ( @Types_id 
				   ,@Types_id
				   ,@Description
				   ,@Description
				   ,@Status_id
				   ,isnull(@Organization_id, 28)
				   ,getutcdate() --@Created_at
				   ,@Plan_start_date
				   ,isnull(@Plan_finish_at , (DATEADD(day, 14, @Plan_start_date)))
				   ,@Priority
				   ,@Report_action_id
				   ,@Fact_finish_at
				   ,@Diameters_ID
				   ,@Is_Template
				   ,@User
				   ,@contact_id
				   ,@contact_id_fiz
				   ,@date_check
				   ,@not_balans
				   ,1
				   )

		declare @Claim_Number int;
		set @Claim_Number = (select top 1 [Id] from @output);

		update  [dbo].[Claims] set Claim_Number = @Claim_Number
									,[Claim_class_ID] = (SELECT [Claim_class_ID]  
										FROM [dbo].[Claim_types] 
										where Claim_types.Id = @Types_id)
									,[Priority] = isnull(@Priority, isnull((SELECT [Priority]  
										FROM [dbo].[Claim_types] 
										where Claim_types.Id = @Types_id),5))
									where Id = @Claim_Number;

		INSERT INTO [dbo].[Claim_Order_Places]
				   ([Claim_ID]
				   ,[Place_ID]
				   ,[Flats_ID]
				   ,[Is_first_place]
				   ,Date_insert
				   )
			 VALUES
				   (@Claim_Number
				   ,@places_id
				   ,@flat_number
				   ,1
				   ,getutcdate()
				   )
		   
			if @type_employee_2 = 5 or @type_employee_2 = 6 or @type_employee_2 = 8 or @type_employee_2 = 15
			begin
				INSERT INTO [dbo].[Claim_content]
					   ([Claim_Id]
					   ,[Sked]
					   ,[TU]
					   ,[TU_Id]
					   ,[Letter]
					   ,[L_Contacts_Id]
					   ,[Gravamen]
					   ,[G_Left]
					   ,[G_PIB]
					   ,Contact_insp_PIB
					   ,Contact_insp_phone)
				 VALUES
					   (@Claim_Number
					   ,@Sked
					   ,@TU
					   ,@TU_Id
					   ,@Letter
					   ,@L_Contacts_Id
					   ,@Gravamen
					   ,@G_Left
					   ,@G_PIB
					   ,@x_pib_inspector
					   ,@x_phone_inspector
					   )
			end

    COMMIT TRANSACTION;

		select @Claim_Number as [Id];
		return;

  END TRY
  BEGIN CATCH
    IF @@TRANCOUNT > 0
    ROLLBACK TRANSACTION;
    
    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    
    select N'Помилка заповнення: ' +  @ErrorMessage

  END CATCH