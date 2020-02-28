select  
    Street_Id as Id
    ,concat(Streets.Name,' ', st.UkrName, case when Old_name is null then Old_name
	                                      else concat (' (',Old_name,')')	
	                                      end
	                                      ,case when Territory is null then Territory
		else concat (' (',Territory,')')	end) as Name 
    from Streets 
        left join Street_Type st on st.TypeId = Streets.Street_type_id
  WHERE Street_type_id <> 0
    and
     #filter_columns#
     #sort_columns#
    offset @pageOffsetRows rows fetch next @pageLimitRows rows only