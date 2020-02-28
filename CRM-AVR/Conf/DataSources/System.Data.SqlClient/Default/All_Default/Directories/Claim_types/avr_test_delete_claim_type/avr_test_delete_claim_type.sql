BEGIN TRY  
    delete from Claim_types where Claim_types.id = @Id  and Is_delete = 1
END TRY  
BEGIN CATCH  
    -- SELECT   
    --     ERROR_NUMBER() AS ErrorNumber  
    --   ,ERROR_MESSAGE() AS ErrorMessage; 
	 select Claims.Id, Claims.Claim_Number 
	 from Claims 
	 where claims.Claim_type_ID = @Id
-- 	  and
--      #filter_columns#
--      #sort_columns#
--  offset @pageOffsetRows rows fetch next @pageLimitRows rows only
END CATCH 