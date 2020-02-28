UPDATE [dbo].[Claim_Documents]
         SET  [Name] = @Name
           ,[Type_Id]= @Type_Id
           ,[Comments]= @Comments
		WHERE Id= @Id