declare @output table ([Id] int);

INSERT INTO [dbo].[Claims]
           ([Claim_class_ID]
           ,[First_claim_type_ID]
           ,[Claim_type_ID]
           ,[First_description]
           ,[Description]
           ,[Status_ID]
           ,[Response_organization_ID]
           ,[Contact_ID]
           ,[Contact_ID_Fiz]
           ,[Created_at]
        --   ,[Plan_start_date]
        --   ,[Plan_finish_at]
        --   ,[Fact_finish_at]
           ,[Priority]
           ,[Report_action_id]
           ,[Diameters_ID]
           ,[Is_Template]
           ,[User]
           ,[date_check]
           ,[not_balans]
           ,[DisplayID])
output [inserted].[Id] into @output([Id])
     SELECT 
       [Claim_class_ID]
      ,[First_claim_type_ID]
      ,[Claim_type_ID]
      ,[First_description]
      ,[Description]
      , 1 -- status 'new'
      ,[Response_organization_ID]
      ,[Contact_ID]
      ,[Contact_ID_Fiz]
      ,GETUTCDATE()
    --   ,[Plan_start_date]
    --   ,[Plan_finish_at]
    --   ,[Fact_finish_at]
      ,[Priority]
      ,[Report_action_id]
      ,[Diameters_ID]
      ,[Is_Template]
      ,@user
      ,[date_check]
      ,[not_balans]
      ,[DisplayID]
  FROM [dbo].[Claims]
  where Id = @Id

declare @Claim_Number int;
set @Claim_Number = (select top 1 ltrim([Id]) from @output);

update  [dbo].[Claims] set Claim_Number = @Claim_Number
                            where Id = @Claim_Number;
                            
INSERT INTO [dbo].[Claim_Order_Places]
           ([Claim_ID]
           ,[Place_ID]
           ,[Flats_ID]
           ,[Is_first_place]
           ,Date_insert
           )
    select
           @Claim_Number
           ,[Place_ID]
            ,[Flats_ID]
           ,[Is_first_place]
           ,getutcdate()
		FROM [dbo].[Claim_Order_Places]  where Claim_ID = @Id

select @Claim_Number as Id