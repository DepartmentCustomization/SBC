SELECT [Mechanisms].[Id]
	  ,Mechanism_types.Name as mechanism_types_name
      ,[Mechanisms].[Name] as mechanisms_name
      ,[Mechanisms].[Number] as mechanisms_number
      ,Organizations.Name as organizations_name
  FROM [dbo].[Mechanisms]
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
	left join Organizations on Organizations.Id = Mechanisms.Organizations_ID

WHERE Mechanisms.Organizations_ID = @org_id
and
	 #filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only