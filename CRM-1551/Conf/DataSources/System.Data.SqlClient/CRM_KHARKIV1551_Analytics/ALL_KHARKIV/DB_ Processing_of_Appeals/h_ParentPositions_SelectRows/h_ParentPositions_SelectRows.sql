select [Positions_parent].Id, ISNULL([Positions_parent].position, N'')+ ISNULL(N' ('+[Organizations].short_name+N')',N'') name
  from [dbo].[Positions] 
  inner join [dbo].[Positions] [Positions_parent] on [Positions].parent_id=[Positions_parent].Id
  left join [dbo].[Organizations] on [Positions_parent].organizations_id=[Organizations].Id
  where [Positions].organizations_id=@vykonavets_Id
  and  #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only