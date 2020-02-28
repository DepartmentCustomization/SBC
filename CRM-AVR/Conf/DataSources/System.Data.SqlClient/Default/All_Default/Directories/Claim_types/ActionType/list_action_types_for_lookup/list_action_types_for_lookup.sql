SELECT [Action_types].[Id]
      ,[Action_types].[Name]
      ,TypeAccess.Name as typeA_name
  FROM [dbo].[Action_types]
  left join TypeAccess on TypeAccess.Id = Action_types.TypeAccess_ID
  where 
    Action_types.TypeAccess_ID @TypeAccess
    and
    #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only