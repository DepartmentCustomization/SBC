Update [dbo].[Materials]
      set  [Name]= @Name
           ,[With_diameter] = @With_diameter
           ,Units_id = @units_id
    where Id =@Id