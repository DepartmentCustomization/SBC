 

INSERT INTO [dbo].[Action_types]
           ([Name]
           ,[Is_move]
           ,TypeAccess_ID
           ,Plan_duration 
           ,Units_Id
           )
output [inserted].[Id]

     VALUES
           (
		   @Name
		   ,@Is_move
		   ,@TypeAccess_ID
		   ,@Plan_duration
		   ,@Units_Id
		   )
		   
select [inserted].[Id] as Id from inserted
return