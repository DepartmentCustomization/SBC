if ((select Status_ID from Claims where Id = @claims_id) = 5) 
    or ((select Closed_at from Orders where Id = @Id ) is not null )
begin 
    -- select N'Closed claim or order'
    return
end
else
begin
    -- if (select Status_ID from Orders  where Id= @Id) in (7,8)
    -- begin
    
    		UPDATE [dbo].[Orders]
    		   SET [Pushed_at] =		@Pushed_at		
    			  ,[Start_at] =			@Start_at		
    			  ,[Plan_duration] =	@Plan_duration	
    			  ,[Finished_at] =		@Finished_at
    			  ,Status_ID =          10
    			  ,[Closed_at] =		getutcdate()	
    			  ,Comment_result = @Comment_result
    			  ,[user_edit] = @User
    			  ,Finish_at_actions = @Finish_at_actions
    		 WHERE Id= @Id
    -- end
end