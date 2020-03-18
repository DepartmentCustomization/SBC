select Id, [Name]
	from Status
	where [Object] like 'Claim'
	and 
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only