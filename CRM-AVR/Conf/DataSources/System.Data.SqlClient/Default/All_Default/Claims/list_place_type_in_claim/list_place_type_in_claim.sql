SELECT [Id]
      ,[Name]
  FROM [dbo].[Place_types]
where id = (select Place_type_ID from Places where id = @type_place)
and
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only