SELECT [Id]
      ,[Doc_Claim_Id]
      ,Name
      ,[URL]
      ,[Created_at]
  FROM [dbo].[File_Doc_Claim]
  where Doc_Claim_Id = @Id
  and [File] is null
    and
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only