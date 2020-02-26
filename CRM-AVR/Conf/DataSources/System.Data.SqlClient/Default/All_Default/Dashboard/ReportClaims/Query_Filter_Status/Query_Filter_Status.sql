SELECT [Id],[Name]  
FROM [CRM_AVR_Analitics].[dbo].[Status] 
where [Object] = N'Claim'
and #filter_columns#
 --    #sort_columns#
 order by 1
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only