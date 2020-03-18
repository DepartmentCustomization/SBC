declare @output table ([Id] int);
declare @ord_table table (Id int);
declare @Claim_Number int;
declare @ord_id int;

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
		   )
output [inserted].[Id] into @output([Id])
     VALUES
           (
            @Types_id --@First_claim_type_ID
           ,@Types_id
           ,@Description
           ,@Description
           ,3 --@Status_id
           ,isnull(@Organization_id, 28)
           ,getutcdate() --@Created_at
           ,@Plan_start_date
           --,DATEADD(day, 14, @Plan_start_date) --@Plan_finish_at
           ,isnull(@Plan_finish_at , (DATEADD(day, 14, @Plan_start_date)))
		   --,isnull(@DatePlanEnd , (DATEADD(day, 14, @Plan_start_date)))
           ,@Priority
           ,@Report_action_id
           ,@Fact_finish_at
           ,@Diameters_ID
           ,0
           ,@User
           ,@contact_id
		   )

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
           ,@Flats_ID
           ,1
           ,getutcdate()
		   );
			
INSERT INTO [dbo].[Orders]
           ([Claim_ID]
           ,[Created_at]
           ,[Overtime]
           ,Status_ID)
output inserted.Id into @ord_table (Id) 
	 SELECT 
		   @Claim_Number
		  ,GETUTCDATE()
		  ,[Overtime]
		  ,7
  FROM [dbo].[Orders]
  where Claim_ID = @temp_id

  set @ord_id = (select top 1 Id from @ord_table)
  
  
INSERT INTO [dbo].[Claim_Order_Places] ([Claim_ID],Orders_Id, [Place_ID],[Flats_ID],[Is_first_place],
										[Is_demage_place],[Demage_place_description],[Lattitude],[Longitude],Date_insert
										)
	SELECT @Claim_Number,@ord_id,@places_id/* [Place_ID]*/,[Flats_ID],[Is_first_place],[Is_demage_place],[Demage_place_description],[Lattitude],[Longitude], getutcdate()
		from Claim_Order_Places
			where [Claim_ID] = @temp_id and [Is_first_place] != 1

  INSERT INTO [dbo].[Actions]
           ([Claim_ID]
           ,[Order_ID]
           ,[Action_type_ID]
           ,[Place_ID]
           ,[Sort_index]
           ,[Is_Goal]
           ,[Diameters_ID]
           ,[Value]
           )
		SELECT 
		   @Claim_Number
		  ,@ord_id
		  ,[Action_type_ID]
		  ,[Place_ID]
		  ,[Sort_index]
		  ,[Is_Goal]
		  ,[Diameters_ID]
		  ,[Value]
  FROM [dbo].[Actions]
  where Claim_ID = @temp_id


select @Claim_Number as [Id];
return;