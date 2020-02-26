SELECT t1.[Id]
      ,t1.[Name]
  FROM (SELECT t1.[Id]
      ,ltrim(isnull(t2.AbbrU,N'')+N' '+[Name])+ case when t1.Territory is null then N'' else N' ('+t1.Territory+N')' end as [Name]
  FROM [CRM_AVR_Analitics].[dbo].[Streets] as t1
  left join  [CRM_AVR_Analitics].[dbo].[Street_Type] as t2 on t2.TypeId = t1.Street_type_id
  where t1.[Street_Id] != 0) as t1
  where #filter_columns#
 --    #sort_columns#
 order by 2
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only