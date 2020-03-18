SELECT 
Units.Id,
Units.ShortName,
Materials.With_diameter
FROM [dbo].[Materials]
left join Units on Units.Id = Materials.Units_Id
WHERE Materials.[Id] = @MaterialId

