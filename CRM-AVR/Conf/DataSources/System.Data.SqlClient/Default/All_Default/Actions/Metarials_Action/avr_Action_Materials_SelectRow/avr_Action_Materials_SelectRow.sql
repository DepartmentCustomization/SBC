SELECT [Action_Materials].[Id]
      ,[Action_Materials].[Action_ID]
      ,Materials.Name as materials_name
		,Materials.Id as materials_id
      ,Diameters.Id as size_id
      ,Diameters.Size
      ,[Action_Materials].[Volume]
    --   ,case 
    --     when [In_out] = 'true' then 1 
    --     when [In_out] = 'false' then 0 
    --   end as In_out
       ,In_out
     ,Units.ShortName
        ,Units.Id as units_id
     ,Orders.Id as orders_Id
  FROM [dbo].[Action_Materials]
    left join Actions on Action_Materials.Action_ID = Actions.Id
	left join Orders on Orders.Id = Actions.Order_ID
	left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID 
	left join Action_types on Action_types.Id = atpt.Action_type_Id
	left join Materials on Materials.Id = Action_Materials.Material_ID
	left join Diameters on Diameters.Id = Action_Materials.Size
	left join Units on Units.Id = Materials.Units_Id
where Action_Materials.Id = @Id
