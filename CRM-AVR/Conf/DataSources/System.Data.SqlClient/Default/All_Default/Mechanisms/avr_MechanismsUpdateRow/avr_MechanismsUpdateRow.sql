UPDATE [dbo].[Mechanisms]
   SET [Name] = @mechanisms_name
      ,[Number] = @mechanisms_number
      ,[Mechanism_type_ID] = @mechanism_type_id
      ,[ParamW] = @ParamW
      ,[ParamL] = @ParamL
      ,[ParamH] = @ParamH
      ,[ParamK] = @ParamK
      ,[ParamD] = @ParamD
 WHERE Id= @Id