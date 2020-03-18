SELECT [Id]
      ,Short_name
  FROM [dbo].[Organizations]
  where [Is_WC] = 1 and is_selected = 1 and Id <>28

  and
    #filter_columns#
   order by Short_name
offset @pageOffsetRows rows fetch next @pageLimitRows rows only