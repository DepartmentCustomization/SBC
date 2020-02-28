select 
	Houses.Id
	,concat( Houses.Name, case when Old_name is null then Old_name
	else concat ('   (',Old_name,')')	end
	,case when Territory is null then Territory
		else concat (' (',Territory,')')	end
	 ) as Name 
from Houses
	left join Streets on Streets.Street_Id = Houses.Street_id
/*select Id, Name from Houses*/
	where 
	#filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only