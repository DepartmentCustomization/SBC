SELECT [Streets].[Id]
      ,Street_Type.UkrName as type_name
        ,Street_Type.TypeId as type_id
      ,[Streets].[Name]
      ,[Streets].[Old_name]
      ,Streets.Territory
  FROM [dbo].[Streets]
	left join Street_Type on Street_Type.TypeId = Streets.Street_type_id
	where Streets.Id= @Id