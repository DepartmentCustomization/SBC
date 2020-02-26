SELECT atpt.[Id]
      ,atpt.[Action_type_Id]
	  ,Action_types.Name as action_name
      ,atpt.[Place_type_Id]
	  ,Place_types.Name as place_name
  FROM [dbo].[Action_type_Place_type] atpt
	left join Action_types on Action_types.Id = atpt.Action_type_Id
	left join Place_types on Place_types.Id = atpt.Place_type_Id
-- WHERE Action_types.Id not in (40,41, 42,173, 174, 175)
WHERE Action_types.Id not in (233,231,48,232, 151,149,10,150)
and Action_types.TypeAccess_ID @TypeAccess
 and
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only