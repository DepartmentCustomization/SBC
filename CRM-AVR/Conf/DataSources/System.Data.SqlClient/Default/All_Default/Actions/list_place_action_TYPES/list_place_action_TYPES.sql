SELECT 
        ap.Id
        ,concat(a.Name, '  (тип місця: ' +  p.Name + ')') as action_place_type_name
        -- ,a.Name as action_place_type_name
  FROM [dbo].[Action_type_Place_type] as ap
  left join Action_types a on a.Id = ap.Action_type_Id
  left join Place_types p on p.Id = ap.Place_type_Id
  where 
    a.TypeAccess_ID @TypeAccess
    -- and ap.Place_type_Id = @place_type
    and a.Id not in (231, 48, 232, 151)
    and
  	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only