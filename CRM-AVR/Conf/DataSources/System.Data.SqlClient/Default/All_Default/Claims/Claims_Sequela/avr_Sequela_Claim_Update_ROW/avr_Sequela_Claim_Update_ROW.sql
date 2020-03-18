UPDATE [dbo].[Sequela]
   SET [Actions_ID] = @Actions_ID
      ,[Description] = @Description
      ,[Created_at] = @Created_at
      ,[Fact_finish_at] = @Fact_finish_at
 WHERE Id= @Id