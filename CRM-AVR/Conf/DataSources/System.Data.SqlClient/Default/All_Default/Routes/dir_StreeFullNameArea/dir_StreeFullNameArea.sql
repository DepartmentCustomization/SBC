SELECT 
	  [Streets].[Id]
      ,concat(Street_Type.AbbrU, ' ', [Streets].[Name]) as street_full_name
      ,Streets.Street_Id
  FROM [dbo].[Streets]
	left join Street_Type on Street_Type.TypeId = Streets.Street_type_id
	where Streets.Street_Id <> 0
	and
     #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only