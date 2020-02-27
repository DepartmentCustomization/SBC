UPDATE  [dbo].[Action_Documents]
       SET  [Name]= @Name
           ,[Type_Id]= @Type_Id
           ,[Comments] = @Comments 
where [Id] = @Id
 
