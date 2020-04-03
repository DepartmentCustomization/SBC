INSERT INTO [dbo].[OutsideMen]
           ([Call_from]
           ,[Plan_date]
           ,[Finish_at]
           ,[Comment]
           ,[Company_Contact_ID]
           ,[Contact_ID]
           ,[Claims_ID])
		output [inserted].[Id]
     VALUES
           (@Call_from
           ,@Plan_date
           ,@Finish_at
           ,@Comment
           ,@company_id
           ,@fiz_name
           ,@Claims_ID
		   )