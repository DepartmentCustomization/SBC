if (select Status_ID from Claims where Id = @claims_id) = 5 
    -- or ((select closed_at from Orders where Id = @Id ) is not null )
begin 
    return
end
else
begin
    if (select Status_ID from Orders  where Id= @Id) in (7,8)
    begin
    		UPDATE [dbo].[Orders]
    		   SET [Shift_ID] =			@shifts_Id
    			  ,[Pushed_at] =		@Pushed_at		
    			  ,[Start_at] =			@Start_at		
    			  ,[Plan_duration] =	@Plan_duration	
    			  ,[Finished_at] =		@Finished_at	
    			 -- ,[Closed_at] =		@Closed_at		
    			  ,[Status_ID] =		@status_id	
    			  ,Comment_result =     @Comment_result
    			  ,[user_edit] =        @User
    			  ,Finish_at_actions =  @Finish_at_actions
    		 WHERE Id= @Id
    		 
    		 -- додавання засув
    		 if @add_action = 1
    		 begin
    		        declare @i int = 0
                    declare @diameter int
                    
                    if(@count > 10 )set  @count = 10
                    while ( @i < @count )
                    begin
                    	set @diameter = case when @i = 0 then @diameter1
                    						 when @i = 1 then @diameter2
                    						 when @i = 2 then @diameter3
                    						 when @i = 3 then @diameter4
                    						 when @i = 4 then @diameter5
                    						 when @i = 5 then @diameter6
                    						 when @i = 6 then @diameter7
                    						 when @i = 7 then @diameter8
                    						 when @i = 8 then @diameter9
                    						 when @i = 9 then @diameter10
                    					end
    
    							INSERT INTO [dbo].[Faucet]
    									   ([Action_types_Id]
    									   ,[Start_from]
    									   --,[Finish_at]
    									   ,[Claim_Id]
    									   ,[Order_Id]
    									   ,[Diametr_Id]
    									   ,[Place_Id])
    								 VALUES
    									   (@action_type_id
    									   --,getutcdate()
    									   ,@finish_at
    									   ,@claims_id
    									   ,@Id
    									   ,@diameter
    									   ,@place_id
    									   )
    									   
                        -- В рамках задачи KVKAVR-169 перенаправлено на таблицу Faucet 16.04.2019
                    	--INSERT INTO [Actions]([Claim_ID],[Order_ID],[Action_type_ID],[Place_ID],[Sort_index]
                    	--		   ,[Is_Goal],[Diameters_ID],[Value],[Start_from],[Finish_at])
                    	--	 VALUES
                    	--		   (@claims_id, @Id, @action_type_id
                    	--		   ,@place_id
                    	--		   ,1, 0, @diameter, 1, getutcdate(), @finish_at)
                    	set @i = @i +1
                    end
                end
    		 --КОНЕЦ додавання засув
    		 
    	if @status_id in (9,10)
    		begin
    			update Orders set Closed_at = ISNULL(@Closed_at, GETUTCDATE())
    			where Id = @Id
    		end
    end
    
    if @Closed_at is not null --and @status_id not in (9,10)
    begin
    	update Orders 
    	    set Status_ID = 10
    	        ,Closed_at = @Closed_at
    	        ,user_edit = @User
    	where Id = @Id
    end
    
    declare @closed_order datetime
    set @closed_order = (select Closed_at from Orders where Id=@Id)
    	
    	if @status_id in (9,10) or @status_id is not null
    	begin
    		update Actions 
    			set	Finish_at = isnull(Actions.Finish_at, @closed_order)
    			where Actions.Order_ID = @Id
    	end
end