SELECT [Action_type_Place_type].[Id]
      ,Action_types.Name as action_type
      ,Place_types.Name as places_type
  FROM [dbo].[Action_type_Place_type]
	left join Action_types on Action_types.Id = Action_type_Place_type.Action_type_Id
	left join Place_types on Place_types.Id = [Action_type_Place_type].Place_type_Id
where Action_type_Place_type.Action_type_Id = @Id
and Action_types.TypeAccess_ID @TypeAccess
and #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only