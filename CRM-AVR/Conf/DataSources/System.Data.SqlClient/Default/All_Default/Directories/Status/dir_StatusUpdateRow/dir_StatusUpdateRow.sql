update [dbo].[Status]
      set  Name =@Name
           ,[Object] = @Object
	WHERE Id = @Id