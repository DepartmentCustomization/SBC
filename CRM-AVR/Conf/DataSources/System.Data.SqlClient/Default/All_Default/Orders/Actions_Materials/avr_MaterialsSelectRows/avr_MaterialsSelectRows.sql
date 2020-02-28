SELECT [Actions].[Id]
      ,Actions.Sort_index
	  ,Action_types.Name as action_type_name
	  ,Materials.Name as material_name
	  ,Diameters.Size
	  ,Action_Materials.Volume
	  ,Units.ShortName
	  ,case when Action_Materials.In_out = 0 then N'Використано'
		else  N'Видобуто' end as In_out
  FROM [dbo].[Actions]
    left join Orders on Orders.Id = Actions.Order_ID
	left join Action_type_Place_type on Action_type_Place_type.Id = Actions.Action_type_ID
    left join Action_types on Action_types.Id = Action_type_Place_type.Action_type_Id

	left join Action_Materials on Action_Materials.Action_ID = Actions.Id
	left join Materials on Materials.Id = Action_Materials.Material_ID
	left join Diameters on Diameters.Id = Action_Materials.Size
	left join Units on Units.Id = Action_Materials.Units_Id
WHERE Actions.Order_ID = @Id and Action_Materials.Action_ID is not null
and 
    #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only