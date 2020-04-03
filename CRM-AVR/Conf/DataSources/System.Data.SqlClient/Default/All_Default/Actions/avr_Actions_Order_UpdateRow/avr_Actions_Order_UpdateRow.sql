if (SELECT [Is_Goal] FROM [dbo].[Actions]  where Claim_ID = @Claim_ID and Is_Goal = any (select 1))  = 1
begin
    UPDATE [dbo].[Actions]
       SET 
           [Action_type_ID] =	@ac_pl_types_id
          ,[Place_ID] =			@places_id
          ,[Plan_start_date] =	@Plan_start_date
          ,[Start_from] = @Start_from
          ,[Finish_at] =		@Finish_at
          ,[Plan_duration] =	@Plan_duration
          ,[Fact_duration] =	@Fact_duration
          ,[Sort_index] =		@Sort_index
         -- ,[Is_Goal] =			@Is_Goal
          ,[Comment] =			@Comment
          ,[Diameters_ID] = @Diameters_ID
          , [Value] = @Value
          ,Do_not = @Do_not
     WHERE Id= @Id
end
    else 
begin
    UPDATE [dbo].[Actions]
       SET
           [Action_type_ID] =	@ac_pl_types_id
          ,[Place_ID] =			@places_id
          ,[Plan_start_date] =	@Plan_start_date
          ,[Finish_at] =		@Finish_at
          ,[Plan_duration] =	@Plan_duration
          ,[Fact_duration] =	@Fact_duration
          ,[Sort_index] =		@Sort_index
          ,[Is_Goal] =			@Is_Goal
          ,[Comment] =			@Comment
          ,[Diameters_ID] = @Diameters_ID
          ,[Value] = @Value
          ,[Start_from] = @Start_from
          ,Do_not = @Do_not
     WHERE Id= @Id
end