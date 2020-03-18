SELECT Id,
       AreaId,
	   Lenght AS [length],
	   DiametersID AS diameter
FROM AreaParam
WHERE Id = @Id ;