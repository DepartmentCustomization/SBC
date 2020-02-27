SELECT Materials.[Id]
      ,Materials.[Name]
      ,[With_diameter]
      ,Units.Id as units_id
     ,Units.[ShortName] as units_name
  FROM [dbo].[Materials]
  	left join Units on Units.Id = Materials.Units_Id 
  where Materials.Id= @Id