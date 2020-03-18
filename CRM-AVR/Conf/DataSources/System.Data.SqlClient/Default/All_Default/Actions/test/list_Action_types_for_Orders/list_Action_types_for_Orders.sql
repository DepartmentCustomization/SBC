select 
    Action_types.Id
-- 	atpt.Id as Id
	,Name
	from Action_types
-- 		left join Action_type_Place_type atpt on atpt.Action_type_Id = Action_types.Id

-- 	where Action_types.Id in (40,41, 42,173, 174, 175)
--where Action_types.Id in (233,231,48,232,151,149,10,150)
	where Action_types.Id in (231, 48, 232, 151)
	and Action_types.TypeAccess_ID @TypeAccess
	    
	
and 
    #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only


 --Закрытие Вентеля - 231 (768), Закрытие Засувки- 48(585),232(769), Открытие засувки для выпуска -151 (688)