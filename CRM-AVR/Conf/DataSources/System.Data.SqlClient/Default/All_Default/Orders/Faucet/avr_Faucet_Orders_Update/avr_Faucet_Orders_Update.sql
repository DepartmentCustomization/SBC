if(select Status_ID from Claims where Id = (select [Claim_Id] from Faucet where Id = @Id )) = 5
begin 
    return
end
else
begin    
    
    if exists (select * from Claim_SwitchOff_Address where Faucet_ID = @Id)
    begin
        UPDATE [dbo].[Faucet]
           SET 
            --   [Start_from] = @Start_from
               [Finish_at] = @Finish_at
              ,[Diametr_Id] = @size_id
              ,[Place_Id] = @places_id
         WHERE Id = @Id
    end
    else
    begin
        UPDATE [dbo].[Faucet]
           SET 
               [Start_from] = @Start_from
              ,[Finish_at] = @Finish_at
              ,[Diametr_Id] = @size_id
              ,[Place_Id] = @places_id
         WHERE Id = @Id
    end
    
    if @Finish_at is not null
    	begin
    		update Claim_SwitchOff_Address
    			set SwitchOff_finish = @Finish_at
    			where Faucet_ID = @Id
    	end
end