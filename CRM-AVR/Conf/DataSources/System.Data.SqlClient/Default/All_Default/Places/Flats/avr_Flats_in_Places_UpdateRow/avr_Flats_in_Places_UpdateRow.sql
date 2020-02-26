update [dbo].[Flats]
       set  [Floor]= @Floor
           ,[Porch]= @Porch
           --,[Number]= @flat_number
           ,[Letter]= @Letter
           ,Comment = @Comment
where Id= @Id