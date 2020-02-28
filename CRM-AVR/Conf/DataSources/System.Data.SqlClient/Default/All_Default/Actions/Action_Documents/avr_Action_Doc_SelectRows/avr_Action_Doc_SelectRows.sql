SELECT [Id]
      ,[Name]
      ,[Type_Id]
      ,[Actions_Id]
      ,[Comments]
  FROM [dbo].[Action_Documents]
  where Actions_Id = @Id
  and
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only