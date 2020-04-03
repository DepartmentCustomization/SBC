SELECT [Id]
      ,[Name]
      ,[Type_Id]
      ,[OutsideMen_Id]
      ,[Comments]
  FROM [dbo].[OutsideMen_Documents]
  where [OutsideMen_Id] = @Id
  and
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only