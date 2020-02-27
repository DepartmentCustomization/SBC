declare @contact_id int
declare @contact_id_fiz int

if (select Status_id from Claims where Id= @Id) in (1,2,3,11)
begin
   if @contact_type = 3
	    begin
    		set @contact_id = @EM_contact_fio
			set @contact_id_fiz = @EM_org_id
    	end
    if @contact_type = 2
    	begin
    		--SET  @contact_id = isnull(@UR_contact_fio, (select Contacts_ID from  Organizations where id= @UR_organization_id ))
			SET  @contact_id = @UR_organization_id
			set  @contact_id_fiz =  @UR_contact_fio
	    end
	 if @contact_type = 1 
	    begin
	        set @contact_id = @FIZ_concact_id
	        set  @contact_id_fiz = null
	    end
    
UPDATE [dbo].[Claims]
   SET 
		[Claim_class_ID] = (select Claim_class_ID from Claim_types where Id= @Types_id) --	@Classes_id		
      ,[Claim_type_ID] =@Types_id		
      ,[Description] =	@Description			
      ,[Status_ID] =	@Status_id			
      ,[Response_organization_ID] = @Organization_id				
      ,[Plan_start_date] =	@Plan_start_date		
      ,[Plan_finish_at] = isnull(@Plan_finish_at , (DATEADD(day, 14, @Plan_start_date)))		
      ,[Priority] =	@Priority				
      ,[Report_action_id] =	@Report_action_id
      ,Fact_finish_at= @Fact_finish_at
      ,Diameters_ID = @Diameters_ID
      ,Is_Template = @Is_Template
      ,[User] = @User
      ,Contact_ID = @contact_id
	  ,Contact_ID_Fiz = @contact_id_fiz
      ,date_check = @date_check
      ,not_balans = @not_balans
 WHERE Id= @Id
 
--  смена основного адреса
if(select Place_ID FROM [Claim_Order_Places] where Claim_ID = @Id and  Is_first_place = 1 ) <> @places_id
 begin
	 update [dbo].[Claim_Order_Places]
		set [Is_first_place]= 0 where Claim_ID = @Id and Is_first_place = 1

	 INSERT INTO [dbo].[Claim_Order_Places]
			   ([Claim_ID]
			   ,[Place_ID]
			   ,[Flats_ID]
			   ,[Is_first_place]
			   ,Date_insert
			   )
		 VALUES
			   (@Id
			   ,@places_id
			   ,@flat_number
			   ,1
			   ,getutcdate()
			   )
end
 
 
 if @Status_id in (5,6)
    begin
	    UPDATE [dbo].[Claims] SET Fact_finish_at = isnull(@Fact_finish_at, getutcdate())
        WHERE Id= @Id
    end
end
 
 declare @finish_at datetime
set @finish_at = (select Plan_finish_at from Claims where Id = @Id)

if @Status_id in (1,2,3,4)
    begin
        update [dbo].[Claim_SwitchOff_Address]
            set [SwitchOff_finish]= isnull(SwitchOff_finish, @finish_at)   
         where Claim_ID = @Id
    end
else
    begin
	    update [dbo].[Claim_SwitchOff_Address]
            set [SwitchOff_finish] =  @Fact_finish_at --(select Fact_finish_at from Claims where Id = @Id)
        WHERE Claim_ID= @Id and SwitchOff_finish >  @Fact_finish_at
    end


if @Fact_finish_at is not null and @Status_id not in (4,5,6)
begin
UPDATE [dbo].[Claims]
   SET Status_ID = 5
 WHERE Id = @Id
 
 -- закрыть все виезды датой закрытия заявки
				UPDATE dbo.Orders
					set Status_ID = 10
						,Closed_at = @Fact_finish_at
						,user_edit = @User
						,Finish_at_actions = isnull(Finish_at_actions, @Fact_finish_at)
						,Finished_at = isnull(Finished_at, @Fact_finish_at)
				where Claim_ID = @Id and Closed_at is null
end