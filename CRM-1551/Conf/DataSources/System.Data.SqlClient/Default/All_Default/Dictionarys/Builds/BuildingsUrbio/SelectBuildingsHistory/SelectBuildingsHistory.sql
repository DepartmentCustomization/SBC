SELECT [user_id], [field],
[before], [after], [change_datetime]
FROM   [dbo].[ObjectHistory]
where element_id = @Id
and #filter_columns#
    #sort_columns#
 --offset @pageOffsetRows rows fetch next @pageLimitRows rows only