SELECT [Mechanisms].[Id]
      ,[Mechanisms].[Name] as mechanisms_name
	  ,Mechanism_types.Name as mechanism_type_name
      ,[Mechanisms].[Number] as mechanisms_number
      ,[Mechanisms].[ParamW]
	  ,[Mechanisms].[ParamD]
      ,[Mechanisms].[ParamK]
      ,[Mechanisms].[ParamH]
      ,[Mechanisms].[ParamL]
  FROM [dbo].[Mechanisms]
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
	left join Organizations on Organizations.Id = Mechanisms.Organizations_ID
		WHERE Mechanisms.Organizations_ID = @IdMech
	and
	#filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only