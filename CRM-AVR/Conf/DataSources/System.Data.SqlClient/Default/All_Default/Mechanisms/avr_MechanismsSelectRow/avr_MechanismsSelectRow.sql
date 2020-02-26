SELECT [Mechanisms].[Id]
      ,[Mechanisms].[Name] as mechanisms_name
	,Mechanism_types.Name as mechanism_type_name
		,Mechanism_types.Id as mechanism_type_id
      ,[Mechanisms].[Number] as mechanisms_number
      ,[Mechanisms].[ParamW]
      ,[Mechanisms].[ParamL]
      ,[Mechanisms].[ParamH]
      ,[Mechanisms].[ParamK]
      ,[Mechanisms].[ParamD]
    ,Organizations.Name as organizations_name
		,Organizations.Id as organizations_id
		,Organizations.Id as organizations_id2
	 -- ,Mechanism_types.Description as mechanism_type_descript
  FROM [dbo].[Mechanisms]
	left join Mechanism_types on Mechanism_types.Id = Mechanisms.Mechanism_type_ID
		left join Organizations on Organizations.Id = Mechanisms.Organizations_ID
	WHERE [Mechanisms].[Id] = @Id