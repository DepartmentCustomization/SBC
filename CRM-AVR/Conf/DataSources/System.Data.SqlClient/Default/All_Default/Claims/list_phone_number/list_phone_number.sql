select 
	  Id
	, Number 
	from Contact_phones 
	where Contact_ID = @cont_fiz_id
	and #filter_columns#
	 #sort_Columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only