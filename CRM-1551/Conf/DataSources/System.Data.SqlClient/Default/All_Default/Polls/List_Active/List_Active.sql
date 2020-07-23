select 0 as [id], N'Виключений' as [Name]
union all
select 1 as [id], N'Включений' as [Name]
where #filter_columns#
#sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
