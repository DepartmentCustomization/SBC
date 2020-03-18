declare @output table ([Id] int);

if ( select Status_ID from Claims where Id = @claims_id ) <> 5
BEGIN    
    INSERT INTO [dbo].[Orders]
               (
    		    [Claim_ID]
               ,[Shift_ID]
               ,[Created_at]
               ,[Pushed_at]
               ,[Start_at]
               ,[Plan_duration]
               ,[Finished_at]
               ,[Closed_at]
               ,[Status_ID]
               ,Comment_result
               ,User_id
               ,Finish_at_actions
    		   )
    	output [inserted].[Id] into @output([Id])
         VALUES
               (
    		    @claims_id
               ,@shifts_Id
               ,getutcdate() --@Created_at
               ,@Pushed_at
               ,@Start_at
               ,@Plan_duration
               ,@Finished_at
               ,@Closed_at
               ,@status_id
               ,@Comment_result
               ,@User
               ,@Finish_at_actions
    		   )
    
    declare @ord_id int;
    set @ord_id = (select top 1 [Id] from @output);
    
    insert into [dbo].[Claim_Order_Places]
               ([Claim_ID]
               ,Orders_ID
               ,[Place_ID]
               --,[Flats_ID]
               ,[Is_first_place]
               )
         VALUES
               (@claims_id
               ,@ord_id
               ,@place_id
               --,@flat_number
               ,0
    		   )
    		   
    select @ord_id as [Id];
    return;
END