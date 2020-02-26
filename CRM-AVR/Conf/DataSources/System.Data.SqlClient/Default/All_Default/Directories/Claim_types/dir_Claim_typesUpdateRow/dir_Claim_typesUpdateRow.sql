UPDATE [dbo].[Claim_types]
   SET 
   --[Parent_сlaim_types_ID] =@Parent_сlaim_types_ID
     [Claim_class_ID] =		@classes_id
       ,[Name] =					@claim_types_name
      ,[Priority] =				@Priority
      ,[Is_diameter_required] = @Is_diameter_required
      ,[Sort_index] =			@Sort_index
     -- ,[TypeAccess_ID] =		@TypeAccess_ID
     ,[Full_Name] =             @full_name
     ,Is_delete =               @Is_delete
 WHERE Id = @Id