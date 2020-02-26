declare @output table ([Id] int);

INSERT INTO [dbo].[Claims]
           (
		   -- [Claim_Number]
           [Claim_class_ID]
           ,[First_claim_type_ID]
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
		   )
output [inserted].[Id] into @output([Id])
     VALUES
           (
		   -- @Claim_Number
           @classes_id
           ,@types_id --@First_claim_type_ID
           ,@types_id
           ,@Description
           ,@Description
           ,@status_id
           ,@organization_id
           ,getutcdate() --@Created_at
           ,@Plan_start_date
           ,DATEADD(day, 14, @Plan_start_date) --@Plan_finish_at
           ,@Priority
           ,@Report_action_id
		   ,@Fact_finish_at
		   )

declare @Claim_Number int;
set @Claim_Number = (select top 1 [Id] from @output);


INSERT INTO [dbo].Appeals
	(
		 [Contact_ID]
		,[Claim_ID]
		,[Date]
	)
values
	(
		 @contact_id
		,@Claim_Number
		,getutcdate()
	)
	
update  [dbo].[Claims] set Claim_Number = @Claim_Number where Id = @Claim_Number;
	
select @Claim_Number as [Id];
return;
