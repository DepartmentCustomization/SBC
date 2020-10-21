select *
from(
	select 1 as Id, N'Rating1' as [Value]
	UNION ALL
	select 2 as Id, N'Rating2' as [Value]
	UNION ALL
	select 3 as Id, N'Rating3' as [Value]
	UNION ALL
	select 4 as Id, N'Rating4' as [Value]
	UNION ALL
	select 6 as Id, N'Rating6' as [Value]
	UNION ALL
	select 7 as Id, N'Rating7' as [Value]
	UNION ALL
	select 8 as Id, N'Rating8' as [Value]
	UNION ALL
	select 9 as Id, N'Rating9' as [Value]
	UNION ALL
	select 10 as Id, N'Rating10' as [Value]
	UNION ALL
	select 11 as Id, N'Rating11' as [Value]
	UNION ALL
	select 12 as Id, N'Rating12' as [Value]
	UNION ALL
	select 13 as Id, N'Rating13' as [Value]
	UNION ALL
	select 14 as Id, N'Rating14' as [Value]
	UNION ALL
	select 15 as Id, N'Rating15' as [Value]
	UNION ALL
	select 16 as Id, N'Rating16' as [Value]
	UNION ALL
	select 17 as Id, N'Rating17' as [Value]
	UNION ALL
	select 18 as Id, N'Rating18' as [Value]
	UNION ALL
	select 19 as Id, N'Rating19' as [Value]
	UNION ALL
	select 20 as Id, N'Rating20' as [Value]
)as Result
where #filter_columns#
order by 1
offset @pageOffsetRows rows fetch next @pageLimitRows rows only