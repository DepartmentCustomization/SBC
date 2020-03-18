select 'Для створення завки за шаблоном натисніть "ЗБЕРЕГТИ" або "ДОДАТИ"'  as Id
where #filter_columns#
	 #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only