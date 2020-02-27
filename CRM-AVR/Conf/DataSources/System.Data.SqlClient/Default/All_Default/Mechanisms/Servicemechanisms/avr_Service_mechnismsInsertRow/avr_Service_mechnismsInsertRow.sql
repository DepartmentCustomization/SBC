INSERT INTO [dbo].[Maintenance]
           ([MechanismsID]
           ,[Start_at]
           ,[Finished_at]
           ,[Name]
           ,[Comment]
           ,[Contacts_ID])
	output [inserted].[Id]
     VALUES
           (@MechanismsID
           ,@Start_at
           ,@Finished_at
           ,@Name
           ,@Comment
           ,@Contacts_ID)