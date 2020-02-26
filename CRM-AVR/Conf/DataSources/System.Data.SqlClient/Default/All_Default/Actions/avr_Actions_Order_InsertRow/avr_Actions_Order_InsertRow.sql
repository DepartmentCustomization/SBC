declare @output table ([Id] int);

declare @Claim_type int
set @Claim_type = (select top 1 Claim_type_ID from Claims where Id = @Claim_ID)


declare @durat_val decimal(5,2)
set @durat_val = isnull((select top 1 [Plan_duration] from [Claim_type_action_type] 
where [Claim_type_id]=@Claim_type and  [Action_type_id] = @ac_pl_types_id),0)


if ( select Status_ID from Claims where Id = @Claim_ID ) = 5
BEGIN 
    return
END
else
BEGIN
    if (select count(Is_Goal) from Actions where Actions.Claim_ID = @Claim_ID and Is_Goal = 1) <> 1
    begin
    
    INSERT INTO [dbo].[Actions]
               (
    		    [Claim_ID]
               ,[Order_ID]
               ,[Action_type_ID]
               ,[Place_ID]
               ,[Plan_start_date]
               ,[Start_from]
               ,[Finish_at]
               ,[Plan_duration]
               ,[Fact_duration]
               ,[Sort_index]
               ,[Is_Goal]
               ,[Comment]
               ,[Diameters_ID]
               ,[Value]
               ,User_id
    		   )
    		   output [inserted].[Id] into @output([Id])
         VALUES
               (
    		    @Claim_ID
               ,@Order_ID
               ,@ac_pl_types_id
               ,@places_id
               ,@Plan_start_date
               ,@Start_from
               ,@Finish_at
               ,isnull(@Plan_duration,@durat_val)
               ,@Fact_duration
               ,isnull(@Sort_index, 1)
               ,@Is_Goal
               ,@Comment
               ,@Diameters_ID
               ,@Value
               ,@User_id
    		   )
    end
        else 
    begin
            INSERT INTO [dbo].[Actions]
              (
    		    [Claim_ID]
              ,[Order_ID]
              ,[Action_type_ID]
              ,[Place_ID]
              ,[Plan_start_date]
              ,[Start_from]
              ,[Finish_at]
              ,[Plan_duration]
              ,[Fact_duration]
              ,[Sort_index]
              -- ,[Is_Goal]
              ,[Comment]
              ,[Diameters_ID]
               ,[Value]
               ,User_id
    		   )
    		   output [inserted].[Id] into @output([Id])
         VALUES
              (
    		    @Claim_ID
              ,@Order_ID
              ,@ac_pl_types_id
              ,@places_id
              ,@Plan_start_date
              ,@Start_from
              ,@Finish_at
              ,isnull(@Plan_duration,@durat_val)
              ,@Fact_duration
              ,isnull(@Sort_index, 1)
              -- ,@Is_Goal
              ,@Comment
              ,@Diameters_ID
               ,@Value
               ,@User_id
    		   )
    end
    
    declare @id_id int;
    set @id_id = (select top 1 [Id] from @output);
    
    select @id_id as Id
    return;
END
