UPDATE [dbo].[OutsideMen]
   SET [Call_from] = @Call_from
      ,[Plan_date] = @Plan_date
      ,[Finish_at] = @Finish_at
      ,[Comment] = @Comment
      ,[Company_Contact_ID] = @company_id
      ,[Contact_ID] = @fiz_name
 WHERE Id = @Id