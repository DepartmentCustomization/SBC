select [Positions_parent].Id, 
[Positions].organizations_id vykonavets_Id,
ISNULL([Positions_parent].position, N'')+ ISNULL(N' ('+[Organizations].short_name+N')',N'') name
  from [dbo].[Positions] 
  inner join [dbo].[Positions] [Positions_parent] on [Positions].parent_id=[Positions_parent].Id
  left join [dbo].[Organizations] on [Positions_parent].organizations_id=[Organizations].Id
  where  #filter_columns#
  --#sort_columns#
  order by 1
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only