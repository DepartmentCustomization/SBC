
SELECT Action_Materials.[Id]
	  ,Action_types.Name as action_type_name
	  ,Actions.Sort_index
	  ,Materials.Name as material_name
	  ,Diameters.Size
	  ,Action_Materials.Volume
	  ,Units.Name
	  ,case when Action_Materials.In_out = 0 then N'Використано'
		when Action_Materials.In_out = 1 then   N'Видобуто' end as In_out
  FROM [dbo].Action_Materials
    left join Actions on Action_Materials.Action_ID = Actions.Id
    left join Orders on Orders.Id = Actions.Order_ID
    left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID 
	left join Action_types on Action_types.Id = atpt.Action_type_Id
--	left join Action_Materials on Action_Materials.Action_ID = Actions.Id
	left join Materials on Materials.Id = Action_Materials.Material_ID
	left join Diameters on Diameters.Id = Action_Materials.Size
	left join Units on Units.Id = Materials.Units_Id
WHERE Actions.Id = @Id
and 
    #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only