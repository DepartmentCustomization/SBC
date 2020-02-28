SELECT [Streets].[Id]
      ,Street_Type.UkrName as type_name
      ,[Streets].[Name]
      ,[Streets].[Old_name]
      ,Streets.Territory
      ,Streets.Street_Id
  FROM [dbo].[Streets]
	left join Street_Type on Street_Type.TypeId = Streets.Street_type_id
	where Streets.Street_Id <> 0
	and
  #filter_columns#
--  order by [Streets].[Name]
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only