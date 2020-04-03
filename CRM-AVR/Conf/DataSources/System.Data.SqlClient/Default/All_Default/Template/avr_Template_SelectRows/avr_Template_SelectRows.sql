select 
	Claims.Description
	,Diameters.Size
	,Claim_classes.Name as classes
	,Claim_types.Name as claims_type
	,case when Claims.Priority = 1 then 'Найкритично'
		  when Claims.Priority = 2 then 'Критично'
		  when Claims.Priority = 3 then 'Важливо'
		  when Claims.Priority = 4 then 'Загально'
		  when Claims.Priority = 5 then 'Планування'
		  end as proirity
	,Claims.Id
	from Claims
		left join Claim_classes on Claim_classes.Id = Claims.Claim_class_ID
		left join Claim_types on Claim_types.Id = Claims.Claim_type_ID	
		left join Diameters on Diameters.Id = Claims.Diameters_ID
	where Claims.Is_Template = 1
	and
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only