SELECT [Action_type_Place_type].[Id]
	,Action_type_Place_type.Action_type_Id as action_type_id
	
      ,Action_types.Name as action_type
      
     ,Place_types.Name as places_type_name
       ,Place_types.Id as places_type_id
       
  FROM [dbo].[Action_type_Place_type]
	left join Action_types on Action_types.Id = Action_type_Place_type.Action_type_Id
	left join Place_types on Place_types.Id = [Action_type_Place_type].Place_type_Id
where [Action_type_Place_type].[Id] = @Id