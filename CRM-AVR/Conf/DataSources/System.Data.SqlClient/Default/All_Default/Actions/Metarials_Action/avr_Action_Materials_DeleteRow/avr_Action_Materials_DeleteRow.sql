-- if (select Status_ID from Orders where Id= 
--     (select Order_ID from Actions where Id = 
--         (select Action_ID from Action_Materials where Id =@Id))) not in (9,10)
-- begin
-- 	DELETE FROM [dbo].[Action_Materials]
--     WHERE Id= @Id
-- end


if (select Status_ID from Claims where Id = (select Claim_ID from Orders where Id= 
                                                (select Order_ID from Actions where Id = 
                                                    (select Action_ID from Action_Materials where Id =@Id))) ) = 5
begin
    return
end
else
begin
    DELETE FROM [dbo].[Action_Materials]
    WHERE Id= @Id      
end