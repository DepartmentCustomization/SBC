declare @output table ([Id] int);

INSERT INTO [dbo].[Claims]
           (
		    --[Claim_Number]
            --[Claim_class_ID]
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
           ,[Diameters_ID]
           ,[User]
           ,DisplayID
		   )
output [inserted].[Id] into @output([Id])
     VALUES
           (
		   -- @Claim_Number
            --@Classes_id
            @Types_id --@First_claim_type_ID
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
           ,@User
           ,1
		   )

declare @claims_number2 int;
set @claims_number2 = (select top 1 [Id] from @output);
insert into [dbo].[Claim_links]
    (
     Claim1_ID
    ,Claim2_ID
   ,Claim_link_type_id
    )
output [inserted].[Id]
values
    (
     @Claim_Number
    ,@claims_number2
    ,@claim_link_types_id
    )

update  [dbo].[Claims] set Claim_Number =  concat(@Claim_Number,'/', (select case when count(*) = 1 then 1 else count(*)end from claim_links where Claim1_ID= @Claim_Number)) 
										--concat(@Claim_Number,'/', (select count(*)+1 from claim_links where Claim1_ID= @Claim_Number)) where Id = @claims_number2;
							,[Claim_class_ID] = (SELECT [Claim_class_ID] FROM [dbo].[Claim_types] where Claim_types.Id = @Types_id)
							,[Priority] = isnull(@Priority, isnull((SELECT [Priority] FROM [dbo].[Claim_types] where Claim_types.Id = @Types_id),5))				
where Id = @claims_number2

INSERT INTO [dbo].[Claim_Order_Places]
           ([Claim_ID]
           ,[Place_ID]
           --,[Flats_ID]
           ,[Is_first_place]
           )
     VALUES
           (@claims_number2
           ,@places_id
           --,@Flats_ID
           ,1
		   )

select @claims_number2 as [Id];
return;