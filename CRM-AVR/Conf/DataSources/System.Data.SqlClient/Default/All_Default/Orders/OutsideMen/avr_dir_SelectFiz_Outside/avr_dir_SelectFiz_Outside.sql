SELECT [Contacts].[Id]
      ,[Contacts].[Name]
	  ,[Contacts].[Contact_type_ID]
	  ,Organisation_ID
  FROM [dbo].[Contacts]
	where [Contacts].Organisation_ID = @org_id
	and 
	 #filter_columns#
	 #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only