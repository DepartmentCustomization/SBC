INSERT INTO [dbo].[Mechanisms]
           ([Name]
           ,[Number]
           ,[Mechanism_type_ID]
           ,[ParamW]
           ,[ParamL]
           ,[ParamH]
           ,[ParamK]
           ,[ParamD]
           ,[Organizations_ID])
	output [inserted].[Id]
     VALUES
           (@mechanisms_name
           ,@mechanisms_number
           ,@mechanism_type_id
           ,@ParamW
           ,@ParamL
           ,@ParamH
           ,@ParamK
           ,@ParamD
           ,@organizations_id
		   )