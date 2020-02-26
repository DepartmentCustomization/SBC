if(select Status_ID from Claims where Id = @Claim_ID) = 5
begin 
    return
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
           ,[Is_Goal]
           ,[Comment]
           ,User_id
		   )
-- 	output [inserted].[Id]
     VALUES
           (
		    @Claim_ID
           ,@Order_ID
           ,@ac_pl_types_id
           ,@places_id
           ,getutcdate() --@Plan_start_date
           ,@Start_from
           ,@Finish_at
           ,@Plan_duration
           ,@Fact_duration
           ,isnull(@Sort_index, 1)
           ,@Is_Goal
           ,@Comment
           ,@User_id
		   )
end