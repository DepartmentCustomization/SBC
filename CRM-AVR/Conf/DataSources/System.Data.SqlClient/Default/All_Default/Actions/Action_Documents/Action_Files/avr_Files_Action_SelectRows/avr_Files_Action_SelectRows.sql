SELECT [Id]
      ,[Doc_Action_Id]
      ,[Name]
      ,[File]
      ,[Created_at]
  FROM [dbo].[File_Doc_Action]
  where Doc_Action_Id = @Id
  and [File] is not null
    and
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only