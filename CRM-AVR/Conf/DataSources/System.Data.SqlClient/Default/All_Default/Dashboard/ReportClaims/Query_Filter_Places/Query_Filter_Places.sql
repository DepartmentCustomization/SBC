SELECT [Id],[Name]
FROM [CRM_AVR_Analitics].[dbo].[Places]
where #filter_columns#
--    #sort_columns#
order by 2
offset @pageOffsetRows rows fetch next @pageLimitRows rows only